import { LoadingOverlay, Stack, Text } from '@mantine/core';
import React from 'react';
import useGetAllTodaysOrders from '../../../hooks/useGetAllTodaysOrders';

function OrdersCounter() {
  const { data, isLoading } = useGetAllTodaysOrders();
  const total = data?.data?.length;

  if (isLoading) return <LoadingOverlay visible={isLoading} />;

  return (
    <Stack spacing={5}>
      {/* eslint-disable-next-line quotes */}
      <Text fz="lg" ta="center">{`No. Today's Orders`}</Text>
      <Text ta="center" fz="xl" fw={500}>{total < 10 ? `0${total}` : total}</Text>
    </Stack>
  );
}

export default OrdersCounter;
