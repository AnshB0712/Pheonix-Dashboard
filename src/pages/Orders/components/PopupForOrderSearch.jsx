import {
  Badge,
  Card, Center, Flex, Group, Loader, Stack, Text,
} from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import customAxios from '../../../api/axios';

const fetcher = (args) => customAxios.get(...args).then(({ data }) => data);

function PopupForOrderSearch({ query }) {
  const { data, isLoading } = useSWR(['admin/get-order', { params: { mobile: query } }], fetcher);
  console.log(data);

  if (isLoading) {
    return (
      <Center style={{ width: '100%' }}>
        <Loader size="xs" />
      </Center>
    );
  }

  return (
    <section style={{ height: 600 }}>
      {data?.data && data.data.map((obj) => (
        <Card withBorder radius="sm" mb={10} width="90%">
          <Card.Section p={5}>
            <Group position="apart">
              <Text fz={13} fw={400} color="dimmed">OrderByMobile:</Text>
              <Text fz={13} fw={500}>{obj.orderByMobile}</Text>
            </Group>
          </Card.Section>
          <Card.Section p={5}>
            <Flex justify="space-between" align="center">
              <Stack align="center" spacing={0}>
                <Text fz={13} fw={400} color="dimmed">OrderStatus:</Text>
                <Text fz={13} fw={500}>
                  {
                obj.orderStatus === 'PNDG'
                  ? (
                    <Badge color="yellow" size="xs">
                      Pending
                    </Badge>
                  )
                  : (
                    <Badge color="green" size="xs">
                      Succesfull
                    </Badge>
                  )
              }
                </Text>
              </Stack>
              <Stack align="center" spacing={0}>
                <Text fz={13} fw={400} color="dimmed">PaymentStatus:</Text>
                <Text fz={13} fw={500}>
                  {
                obj.paymentStatus === 'PNDG'
                  ? (
                    <Badge color="yellow" size="xs">
                      Pending
                    </Badge>
                  )
                  : (
                    <Badge color="green" size="xs">
                      Succesfull
                    </Badge>
                  )
              }
                </Text>
              </Stack>
            </Flex>
          </Card.Section>
          <Card.Section p={5}>
            <Text fz={13} ta="center" color="dimmed">Order Summary Below</Text>
            <ul style={{
              borderTop: '1px dashed gray',
              borderBottom: '1px dashed gray',
              padding: '5px 10px',
              maxHeight: '100px',
              overflow: 'auto',
              margin: '0',
            }}
            >
              {obj.items.map((item) => (
                <li style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  listStyleType: 'circle',
                }}
                >
                  <Text fz={13} fw={500} fs="italic" transform="capitalize">{item.itemName}</Text>
                  <Text fz={13} fw={500} fs="italic">{`₹${item.perPrice}`}</Text>
                  <Text fz={13} fw={500} fs="italic">{`${item.qty}x`}</Text>
                </li>
              ))}
            </ul>
          </Card.Section>
        </Card>
      ))}
    </section>
  );
}

export default PopupForOrderSearch;
