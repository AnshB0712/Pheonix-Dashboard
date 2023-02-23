import React, { useState } from 'react';
import {
  ActionIcon,
  Group, LoadingOverlay, Stack, Table, Text, TextInput,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import DisplayData from '../../components/DisplayData';
import OrderRow from './components/OrderRow';
import useGetAllSxsTxnOrder from '../../hooks/useGetAllSxsTxnOrder';
import MobileOrderRow from './components/MobileOrderRow';
import DailyStats from './components/DailyStats';

function Transactions() {
  const { data, isLoading } = useGetAllSxsTxnOrder();
  const [query, setQuery] = useState('');
  const mediaQ = useMediaQuery('(max-width:500px)');
  const filteredOrders = data?.data?.filter((order) => order.orderByMobile.includes(query));

  if (isLoading) return <LoadingOverlay visible />;

  return (
    <>
      <Stack>
        <Group align="center" position="apart">
          <TextInput
            type="number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="sm"
            error={query?.length > 10 && 'Mobile number only contains 10 Digits.'}
            radius={8}
            placeholder="Search Via WhatsApp Number"
            style={{
              width: '300px',
            }}
            rightSection={(
              <ActionIcon disabled={query.length !== 10}>
                <IconSearch size={18} />
              </ActionIcon>
            )}
          />
          <Text fs="italic" ta="center">{`Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`}</Text>
        </Group>
        <DailyStats />
        {mediaQ
          ? <DisplayData data={filteredOrders} Component={MobileOrderRow} componentProps={{ query }} isLoading={isLoading} />
          : <OrdersTable filteredOrders={filteredOrders} query={query} isLoading={isLoading} />}
      </Stack>
      <Outlet />
    </>
  );
}

function OrdersTable({ filteredOrders, query, isLoading }) {
  return (
    <Table striped highlightOnHover verticalSpacing="sm">
      <thead>
        <tr>
          <th>
            <Text ta="center" fz="xs" fw={500}>OrderByName</Text>
          </th>
          <th>
            <Text ta="center" fz="xs" fw={500}>OrderByMobile</Text>
          </th>
          <th>
            <Text ta="center" fz="xs" fw={500}>OrderType</Text>
          </th>
          <th>
            <Text ta="center" fz="xs" fw={500}>OrderItems</Text>
          </th>
          <th>
            <Text ta="center" fz="xs" fw={500}>Amount</Text>
          </th>
          <th>
            <Text ta="center" fz="xs" fw={500}>OrderStaus</Text>
          </th>
          <th>
            <Text ta="center" fz="xs" fw={500}>TxnStatus</Text>
          </th>
        </tr>
      </thead>
      <tbody>
        <DisplayData data={filteredOrders} Component={OrderRow} componentProps={{ query }} isLoading={isLoading} />
      </tbody>
    </Table>
  );
}

export default Transactions;
