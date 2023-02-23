import { Group, MediaQuery } from '@mantine/core';
import React from 'react';
import DayRevenue from '../../Aside/components/DayRevenue';
import OrdersCounter from '../../Aside/components/OrdersCounter';

function DailyStats() {
  return (
    <MediaQuery
      query="(max-width:500px)"
      styles={{ display: 'none' }}
    >
      <Group align="center" position="apart" px={10}>
        <DayRevenue />
        <OrdersCounter />
      </Group>
    </MediaQuery>
  );
}

export default DailyStats;
