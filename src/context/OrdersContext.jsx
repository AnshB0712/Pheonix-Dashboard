import React, {
  createContext, useContext, useEffect, useState, useRef,
} from 'react';
import { io } from 'socket.io-client';
import usePrivateAxios from '../hooks/usePrivateAxios';
import { useAuth } from './AuthContext';

const OrderContext = createContext('');

export const useOrderContext = () => useContext(OrderContext);

function OrderContextProvider({ children }) {
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const customAxios = usePrivateAxios();
  // TO MAKE THE GET-ALL-TODAYS-ORDER ENDPOINT CALL ONCE ONLY WHEN SYSTEM WAKES UP AFTER FAILURE
  const wokeUp = useRef(0);

  const { user } = useAuth();

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_BACKEND_URL}/admin/todays-orders`, {
      auth: {
        token: user.user?.token,
      },
    });

    socket.on('connect', () => {
      console.log(`Socket connected to ${socket.id}`);
      socket.on('new-order', (order) => {
        console.log('socket');
        setOrders((p) => {
          const currentOrders = [...p, order];
          const uniqueOrdersIds = [...new Set(currentOrders.map((obj) => obj._id))];
          // eslint-disable-next-line no-shadow
          return uniqueOrdersIds.reduce((acc, id) => {
            // eslint-disable-next-line no-shadow
            const orderExist = currentOrders.find((order) => order._id === id);
            console.log(orderExist);
            if (orderExist) return [...acc, orderExist];
            return acc;
          }, []);
        });
      });
    });

    socket.on('connect_error', (error) => {
      console.log(error.message);
    });

    return () => {
      socket.disconnect();
      console.log('disconnect');
    };
  }, [user.user?.token]);

  // INCASE TO KEEP TRACK OF ORDERS COMING WHILE SYSTEM IS DOWN
  useEffect(() => {
    console.log(wokeUp.current, 'wokeup');

    if (!user.user || wokeUp.current > 0) return;

    const arrayOfOrderIds = JSON.parse(localStorage.getItem('orders'))?.map((order) => order._id) || [];
    console.log(arrayOfOrderIds);

    const getOrders = async () => {
      try {
        const { data } = await customAxios.get('admin/get-all-today-orders', { params: { arrayOfOrderIds: arrayOfOrderIds.join(',') } });
        // eslint-disable-next-line no-shadow
        const orders = data?.data;

        if (!orders) return;

        setOrders((p) => [...p, ...orders]);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();

    wokeUp.current += 1;
  }, [user.user]);

  // TO KEEP UP WITH ORDERS INCOMING VIA SOCKET AND STORE IT LOCALSTORAGE IN CASE SYSTEM FAILS
  useEffect(() => {
    const uniqueOrders = [...new Set([...orders.map((order) => order._id)])];
    const ordersObjects = uniqueOrders.map((id) => orders.find((o) => o._id === id));
    localStorage.setItem('orders', JSON.stringify(ordersObjects));
  }, [orders]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <OrderContext.Provider value={{ orders, setOrders, wokeUp }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;
