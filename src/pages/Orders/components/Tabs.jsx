import React from 'react';
import { Tabs as MantineTabs } from '@mantine/core';
import PendingOrderTab from './PendingOrderTab';
import CompletedOrdersTab from './CompletedOrdersTab';

function Tabs() {
  return (
    <MantineTabs defaultValue="PNDG">

      <MantineTabs.List grow>
        <MantineTabs.Tab value="PNDG">Pending</MantineTabs.Tab>
        <MantineTabs.Tab value="SXS">Completed</MantineTabs.Tab>
      </MantineTabs.List>

      <PendingOrderTab />
      <CompletedOrdersTab />

    </MantineTabs>
  );
}

export default Tabs;
