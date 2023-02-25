import {
  Badge, Card, Flex, Highlight, Text,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import dateToISO from '../../../utils/dateToISO';
import { OrderItemsPopOver } from './OrderRow';

function MobileOrderRow({ data: order, query }) {
  const navigate = useNavigate();
  return (
    <Card radius="md" withBorder onClick={() => navigate(`/transactions/${order._id}`)}>

      <Card.Section py={10} px={5} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <OrderItemsPopOver orderItems={order.items} />
        <Text size="xs" align="center">
          Time:
          {' '}
          {dateToISO(order.createdAt)}
        </Text>
        <Badge color="teal">Dine In</Badge>
      </Card.Section>

      <Card.Section px={5} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Flex align="center" justify="space-between" gap={5}>
          <Text fw={400} fz="xs">Name:</Text>
          <Text fw={500} fz="xs">{order.orderByName}</Text>
        </Flex>
        <Flex align="center" justify="space-between" gap={5}>
          <Text fw={400} fz="xs">Mobile:</Text>
          <Highlight highlight={`${query}`} component={Text} ta="center" fz="xs" fw={500}>{order.orderByMobile}</Highlight>
        </Flex>
      </Card.Section>

      <Card.Section py={10} px={5} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Flex align="center" direction="column">
          <Text fw={400} fz="xs">Amount:</Text>
          <Text fw={500} fz="xs">{`₹${order.amount}`}</Text>
        </Flex>
        <Flex align="center" justify="center" direction="column">
          <Text fw={400} fz="xs">OrderStatus:</Text>
          <Text fw={500} fz="sm"><Badge size="xs" color="green">Success</Badge></Text>
        </Flex>
        <Flex align="center" direction="column">
          <Text fw={400} fz="xs">PaymentStatus:</Text>
          <Text fw={500} fz="sm"><Badge size="xs" color="green">Success</Badge></Text>
        </Flex>
      </Card.Section>

    </Card>
  );
}

export default MobileOrderRow;
