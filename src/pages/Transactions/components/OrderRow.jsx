/* eslint-disable react/destructuring-assignment */
import {
  Badge, Button, Highlight, Popover, Table, Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderItemsPopOver({ orderItems }) {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close} size="xs" variant="outline">
          Items
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Table striped withColumnBorders>
          <thead>
            <tr>
              <th>
                <Text ta="center" fz={10} fw={500}>ItemName</Text>
              </th>
              <th>
                <Text ta="center" fz={10} fw={500}>QTY</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((obj) => (
              <tr>
                <td>
                  <Text ta="center" transform="capitalize" fz={10} fw={700}>{obj.itemName}</Text>
                </td>
                <td>
                  <Text ta="center" fz={10} fw={700}>{`${obj.qty}x`}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Popover.Dropdown>
    </Popover>
  );
}

function OrderRow({ data: order, query }) {
  const navigate = useNavigate();
  return (
    <tr style={{ cursor: 'pointer' }} onClick={() => navigate(`${order._id}`)}>
      <td>
        <Text ta="center" fz="sm" fw={400}>
          {order.orderByName}
        </Text>
      </td>
      <td>
        <Highlight highlight={`${query}`} component={Text} ta="center" fz="sm" fw={400}>{order.orderByMobile}</Highlight>
      </td>
      <td>
        <Text ta="center" fz="sm" fw={400}>
          {/* eslint-disable-next-line eqeqeq */}
          {order.orderType == '7' ? 'Dine In' : 'Take Out'}
        </Text>
      </td>
      <td style={{ textAlign: 'center' }}>
        <OrderItemsPopOver orderItems={order.items} />
      </td>
      <td>
        <Text ta="center" fz="sm" fw={400}>
          {`₹${order.amount}`}
        </Text>
      </td>
      <td>
        <Text ta="center" fz="sm" fw={400}>
          {order.orderStatus === 'PNDG' ? <Badge color="yellow" size="xs">Pending</Badge> : <Badge color="green" size="xs">Successul</Badge>}
        </Text>
      </td>
      <td>
        <Text ta="center" fz="sm" fw={400}>
          {order.paymentStatus === 'PNDG' ? <Badge color="yellow" size="xs">Pending</Badge> : <Badge color="green" size="xs">Successul</Badge>}
        </Text>
      </td>
    </tr>
  );
}

export default OrderRow;
