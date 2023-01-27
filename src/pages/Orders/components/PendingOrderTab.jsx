/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import { io } from 'socket.io-client';
import differenceWith from 'lodash.differencewith';
import isEqual from 'lodash.isequal';
import OrderCard from './OrderCard';
import CardsContainer from '../../../components/CardsContainer';
import SearchBarForPendingOrders from './SearchBarForPendingOrders';
import DisplayData from '../../../components/DisplayData';
import { useAuth } from '../../../context/AuthContext';
import useGetAllTodaysOrders from '../../../hooks/useGetAllTodaysOrders';

function PendingOrderTab() {
  const { data: SWRdata, isLoading } = useGetAllTodaysOrders();
  const [orders, setOrders] = useState([]);
  // TO SEARCH ORDER FOR ON THE BASIS OF PHONE NUMBER
  const [query, setQuery] = useState('');
  const queriedOrders = orders.filter((obj) => obj.orderStatus === 'PNDG' && obj.orderByMobile.includes(query));

  const { user } = useAuth();

  useEffect(() => {
    // const socket = io(`${import.meta.env.VITE_BACKEND_URL}/admin/todays-orders`);
    const socket = io('http://localhost:3000/admin/todays-orders', {
      auth: {
        token: user.token,
      },
    });

    socket.on('connect', () => {
      console.log(`Socket connected to ${socket.id}`);
      socket.on('new-order', (order) => {
        setOrders((p) => ([...p, order]));
      });
    });

    socket.on('connect_error', (error) => {
      console.log(error.message);
    });

    return () => {
      socket.disconnect();
      console.log('disconnect');
    };
  }, [user]);

  useEffect(() => {
    if (!isLoading && SWRdata?.data) {
      setOrders((prev) => {
        const uniqueOrders = differenceWith(SWRdata.data, prev, isEqual);
        console.log(uniqueOrders);
        return [...prev, ...uniqueOrders];
      });
    }
  }, [SWRdata]);

  if (isLoading) return <p>loading...</p>;

  return (
    <Tabs.Panel value="PNDG" p={5}>
      <section style={{ display: 'grid', gridTemplateRows: '.2fr 1fr' }}>
        <SearchBarForPendingOrders query={query} setQuery={setQuery} queriedOrders={queriedOrders} />
        <CardsContainer>
          <DisplayData data={queriedOrders} Component={OrderCard} componentProps={{ query, setOrders }} />
        </CardsContainer>
      </section>
    </Tabs.Panel>
  );
}

export default PendingOrderTab;