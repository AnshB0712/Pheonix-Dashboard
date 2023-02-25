import React from 'react';
import { Button, Stack, Text } from '@mantine/core';
import { useForceUpdate, useMediaQuery } from '@mantine/hooks';
import { IconRefresh } from '@tabler/icons';
import { Link } from 'react-router-dom';
import OrdersCounter from './components/OrdersCounter';
import DayRevenue from './components/DayRevenue';
import { useAuth } from '../../context/AuthContext';

function AsideWrapper() {
  const mediaQ = useMediaQuery('(min-width:1000px)');
  const forcedUpdate = useForceUpdate();
  const { user } = useAuth();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!user.user?.token) return <></>;

  return (
    <Stack p={10} justify="space-between">
      <Text ta="center" fz="sm" td="underline">Summary</Text>
      <OrdersCounter />
      <DayRevenue />
      <Button variant="outline" leftIcon={<IconRefresh />} onClick={forcedUpdate} fullWidth size="sm" mt="auto">Refresh</Button>
      {!mediaQ && <Link to="/" style={{ margin: 'auto', fontSize: '.85rem', color: '#339af0' }}>Back To Orders</Link>}
    </Stack>
  );
}

export default AsideWrapper;
