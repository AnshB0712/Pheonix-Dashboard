/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Tabs } from '@mantine/core';
import OrderCard from './OrderCard';
import CardsContainer from '../../../components/CardsContainer';
import SearchBarForPendingOrders from './SearchBarForPendingOrders';
import DisplayData from '../../../components/DisplayData';
import { useOrderContext } from '../../../context/OrdersContext';

function PendingOrderTab() {
  const { orders, setOrders } = useOrderContext();
  // TO SEARCH ORDER FOR ON THE BASIS OF PHONE NUMBER
  const [query, setQuery] = useState('');
  const queriedOrders = orders.filter((obj) => obj.orderStatus === 'PNDG' && obj.orderByMobile.includes(query));

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
