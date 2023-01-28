/* eslint-disable react/no-array-index-key */
/* eslint-disable eqeqeq */
import {
  Card,
  Group, Highlight, Text,
} from '@mantine/core';
import React from 'react';

function CompletedOrdersCard({
  data: {
    orderByName, orderByMobile, _id, updatedAt, items, amount,
  }, query,
}) {
  return (
    <Card
      withBorder
      sx={() => ({
        maxWidth: '300px',
      })}
    >
      <Card.Section sx={(theme) => ({
        border: '1px solid #dbdbd8',
        background: theme.colors.teal[6],
      })}
      >
        <Text ta="center" fw={500} c="white">Completed Order</Text>
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
          <Text fz={14} fw={500}>{new Date(updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</Text>
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
          {items.map((obj, i) => (
            <li
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                listStyleType: 'circle',
              }}
              key={i}
            >
              <Text fz={12} fw={500} fs="italic" transform="capitalize">{obj.itemName}</Text>
              <Text fz={12} fw={500} fs="italic">{`₹${obj.perPrice}`}</Text>
              <Text fz={12} fw={500} fs="italic">{`${obj.qty}x`}</Text>
            </li>
          ))}
        </ul>
      </Card.Section>
      <Card.Section p={5}>
        <Group position="center" align="center">
          <Group position="apart" align="center" spacing={1}>
            <Text fz={14} fw={400} color="dimmed">Amount:</Text>
            <Text fz={14} fw={500}>{`₹${amount}`}</Text>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default CompletedOrdersCard;
