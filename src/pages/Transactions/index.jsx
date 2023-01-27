import React, { useState } from 'react';
import {
  ActionIcon,
  Group, Stack, Table, Text, TextInput,
} from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { IconSearch } from '@tabler/icons';
import DisplayData from '../../components/DisplayData';
import OrderRow from './components/OrderRow';
import useGetAllTodaysOrders from '../../hooks/useGetAllTodaysOrders';

function Transactions() {
  const { data, isLoading } = useGetAllTodaysOrders();
  const [query, setQuery] = useState('');

  const filteredOrders = data?.data?.filter((order) => order.orderByMobile.includes(query));

  if (isLoading) return <p>Loading...</p>;

  return (
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
        <Text fs="italic">{`Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`}</Text>
      </Group>
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
          <DisplayData data={filteredOrders} Component={OrderRow} componentProps={{ query }} />
        </tbody>
        <Outlet />
      </Table>
    </Stack>
  );
}

export default Transactions;
