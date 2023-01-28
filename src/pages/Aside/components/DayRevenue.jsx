import { LoadingOverlay, Stack, Text } from '@mantine/core';
import React from 'react';
import useGetAllSxsTxnOrder from '../../../hooks/useGetAllSxsTxnOrder';

function DayRevenue() {
  const { data, isLoading } = useGetAllSxsTxnOrder();
  const amt = data?.data?.reduce((acc, order) => acc + order.amount, 0);

  if (isLoading) return <LoadingOverlay visible={isLoading} />;

  return (
    <Stack>
      <Text fz="lg" ta="center">{'Today\'s Revenue'}</Text>
      <Text ta="center" fz="xl" fw={500}>{`₹${amt ?? '--'}`}</Text>
    </Stack>
  );
}

export default DayRevenue;
