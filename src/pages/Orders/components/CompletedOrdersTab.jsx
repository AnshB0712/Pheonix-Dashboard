import React, { useState } from 'react';
import { Tabs as MantineTabs } from '@mantine/core';
import useGetAllCompletedOrders from '../../../hooks/useGetAllCompletedOrders';
import SearchBarForPendingOrders from './SearchBarForPendingOrders';
import CardsContainer from '../../../components/CardsContainer';
import DisplayData from '../../../components/DisplayData';
import CompletedOrdersCard from './CompletedOrdersCard';

function CompletedOrdersTab() {
  const [orderType, setOrderType] = useState('7');
  const { data } = useGetAllCompletedOrders(orderType);
  // TO SEARCH ORDER FOR ON THE BASIS OF PHONE NUMBER
  const [query, setQuery] = useState('');
  const queriedOrders = data?.data?.filter((obj) => obj.orderByMobile.includes(query));

  return (
    <MantineTabs.Panel value="SXS" pt="xs">
      <MantineTabs defaultValue="7" variant="outline" value={orderType} onTabChange={(val) => setOrderType(val)}>
        <MantineTabs.List grow>
          <MantineTabs.Tab value="7">
            Dine In
          </MantineTabs.Tab>
          <MantineTabs.Tab value="13">
            Take Out
          </MantineTabs.Tab>
        </MantineTabs.List>

        <MantineTabs.Panel value="7">
          <section style={{ display: 'grid', gridTemplateRows: '.2fr 1fr' }}>
            <SearchBarForPendingOrders query={query} setQuery={setQuery} queriedOrders={queriedOrders} completedOrderTab />
            <CardsContainer>
              <DisplayData data={queriedOrders} Component={CompletedOrdersCard} componentProps={{ query }} />
            </CardsContainer>
          </section>
        </MantineTabs.Panel>

        <MantineTabs.Panel value="13">
          <section style={{ display: 'grid', gridTemplateRows: '.2fr 1fr' }}>
            <SearchBarForPendingOrders query={query} setQuery={setQuery} queriedOrders={queriedOrders} completedOrderTab />
            <CardsContainer>
              <DisplayData data={queriedOrders} Component={CompletedOrdersCard} componentProps={{ query }} />
            </CardsContainer>
          </section>
        </MantineTabs.Panel>
      </MantineTabs>
    </MantineTabs.Panel>

  );
}

export default CompletedOrdersTab;
