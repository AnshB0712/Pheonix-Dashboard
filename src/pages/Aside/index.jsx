import React from 'react';
import { Button, Stack, Text } from '@mantine/core';
import { useForceUpdate } from '@mantine/hooks';
import { IconRefresh } from '@tabler/icons';
import OrdersCounter from './components/OrdersCounter';
import DayRevenue from './components/DayRevenue';
import { useAuth } from '../../context/AuthContext';

function AsideWrapper() {
  const forcedUpdate = useForceUpdate();
  const { user } = useAuth();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!user.token) return <></>;

  return (
    <Stack p={10} justify="space-between">
      <Text ta="center" fz="sm" td="underline">Summary</Text>
      <OrdersCounter />
      <DayRevenue />
      <Button leftIcon={<IconRefresh />} onClick={forcedUpdate} fullWidth size="md" mt="auto">Refresh</Button>
    </Stack>
  );
}

export default AsideWrapper;
