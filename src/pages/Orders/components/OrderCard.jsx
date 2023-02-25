/* eslint-disable eqeqeq */
import {
  Card,
  Group, Highlight, LoadingOverlay, Switch, Text,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import React from 'react';
import useChangeOrderStatus from '../../../hooks/useChangeOrderStatus';

function OrderCard({
  data: {
    orderByName, orderByMobile, _id, createdAt, items, orderType, amount, deliveryTag,
  },
  query,
  setOrders,
}) {
  const [value, toggle] = useToggle([false, true]);
  const { trigger, isLoading } = useChangeOrderStatus();
  const handleChange = async () => {
    try {
      await trigger({ id: _id, deliveryTag });
      toggle();
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== _id));
    } catch (error) {
      console.log(error);
      toggle();
    }
  };

  return (
    <Card
      withBorder
      sx={() => ({
        maxWidth: '300px',
        display: value ? 'none' : 'block',
      })}
    >
      <Card.Section sx={(theme) => ({
        border: '1px solid #dbdbd8',
        background: orderType == '7' ? theme.colors.green[6] : theme.colors.blue[6],
      })}
      >
        <Text ta="center" fw={500} c="white">{orderType == '7' ? 'Dine In' : 'Take Out'}</Text>
      </Card.Section>
      <Card.Section p={5}>
        <Group position="apart">
          <Text fz={14} fw={400} color="dimmed">OrderID:</Text>
          <Text fz={14} fw={500}>{_id}</Text>
        </Group>
        <Group position="apart">
          <Text fz={14} fw={400} color="dimmed">OrderBy:</Text>
          <Text fz={14} fw={500}>{orderByName}</Text>
        </Group>
        <Group position="apart">
          <Text fz={14} fw={400} color="dimmed">Mobile:</Text>
          <Highlight highlight={`${query}`} component={Text} fz={14} fw={500}>{orderByMobile}</Highlight>
        </Group>
        <Group position="apart">
          <Text fz={14} fw={400} color="dimmed">Date and Time :</Text>
          <Text fz={14} fw={500}>{new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</Text>
        </Group>
      </Card.Section>
      <Card.Section p={5}>
        <Text fz={14} ta="center" color="dimmed">Order Summary Below</Text>
        <ul style={{
          borderTop: '1px dashed gray',
          borderBottom: '1px dashed gray',
          padding: '5px 10px',
          maxHeight: '100px',
          overflow: 'auto',
          margin: '0',
        }}
        >
          {items.map((obj) => (
            <li style={{
              display: 'flex',
              justifyContent: 'space-between',
              listStyleType: 'circle',
            }}
            >
              <Text fz={12} fw={500} fs="italic" transform="capitalize">{obj.itemName}</Text>
              <Text fz={12} fw={500} fs="italic">{`₹${obj.perPrice}`}</Text>
              <Text fz={12} fw={500} fs="italic">{`${obj.qty}x`}</Text>
            </li>
          ))}
        </ul>
      </Card.Section>
      <Card.Section p={5}>
        <Group position="apart" align="center">
          <Group position="apart" align="center" spacing={1}>
            <Text fz={14} fw={400} color="dimmed">Amount:</Text>
            <Text fz={14} fw={500}>{`₹${amount}`}</Text>
          </Group>
          <Group position="apart" align="center" spacing={5}>
            <Text fz={12} fw={600} color="yellow">Pending</Text>
            <Switch
              size="xs"
              checked={value}
              onChange={(e) => handleChange(e.target.checked)}
              style={{
                display: 'grid',
                placeItems: 'center',
              }}
            />
            <Text fz={12} fw={600} color="green">Complete</Text>
          </Group>
        </Group>
      </Card.Section>
      <LoadingOverlay visible={isLoading} />
    </Card>
  );
}

export default OrderCard;
