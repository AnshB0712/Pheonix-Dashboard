import { LoadingOverlay, Stack, Text } from '@mantine/core';
import React from 'react';
import useGetAllSxsTxnOrder from '../../../hooks/useGetAllSxsTxnOrder';

function OrdersCounter() {
  const { data, isLoading } = useGetAllSxsTxnOrder();
  const total = data?.data?.length;

  if (isLoading) return <LoadingOverlay visible={isLoading} />;

  return (
    <Stack spacing={5}>
      {/* eslint-disable-next-line quotes */}
      <Text fz="lg" ta="center">{`No. Today's Orders`}</Text>
      {/* eslint-disable-next-line no-nested-ternary */}
      <Text ta="center" fz="xl" fw={500}>{total !== undefined ? (total < 10 ? `0${total}` : total) : '--'}</Text>
    </Stack>
  );
}

export default OrdersCounter;
