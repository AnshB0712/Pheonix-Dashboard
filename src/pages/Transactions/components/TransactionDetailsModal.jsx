/* eslint-disable react/jsx-no-useless-fragment */
// eslint-disable-next-line react/jsx-no-useless-fragment
import {
  Badge,
  Button,
  Group,
  LoadingOverlay, Modal, Paper, Popover, Stack, Table, Text, Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import customAxios from '../../../api/axios';

const fetcher = (url) => customAxios.get(url).then(({ data }) => data);

const ingnoredProperties = ['_id', '__v', 'transactionId', 'responseCode', 'responseMessage', 'bankTransactionId', 'createdAt', 'updatedAt'];

function UserInfoPopOver({ userId }) {
  const [opened, { close, open }] = useDisclosure(false);
  const { data } = useSWR(`admin/user/${userId}`, fetcher);
  return (
    <Popover width={200} position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button onMouseEnter={open} onMouseLeave={close} size="xs" variant="outline">
          User
        </Button>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Table striped withColumnBorders>
          <thead>
            <tr>
              <th>
                <Text ta="center" fz={10} fw={500}>Name</Text>
              </th>
              <th>
                <Text ta="center" fz={10} fw={500}>Mobile</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Text ta="center" transform="capitalize" fz={10} fw={700}>{data?.data?.name}</Text>
              </td>
              <td>
                <Text ta="center" fz={10} fw={700}>{data?.data?.mobile}</Text>
              </td>
            </tr>
          </tbody>
        </Table>
      </Popover.Dropdown>
    </Popover>
  );
}

function TransactionDetailsModal() {
  const { orderId } = useParams();
  const { data, isLoading } = useSWR(`admin/transaction/${orderId}`, fetcher);
  const navitgate = useNavigate();

  if (!data) return <></>;
  return (
    <Modal opened centered withCloseButton={false} onClose={() => navitgate(-1)}>
      <LoadingOverlay visible={isLoading} />
      <Paper p="xs" style={{ position: 'relative' }}>
        <Title order={5} ta="center" mb={10}>Transaction</Title>
        <Stack spacing={10}>
          {
                Object.entries(data.data).map(([key, val], i) => {
                  if (ingnoredProperties.includes(key)) return <></>;

                  let modifiedVal = val;

                  if (key === 'transactionDate') { modifiedVal = new Date(val).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); }
                  if (key === 'status') { modifiedVal = <Badge fw={400} size="md" color={val === 'TXN_SUCCESS' ? 'green' : 'red'}>{val}</Badge>; }
                  if (key === 'orderBy') { modifiedVal = <UserInfoPopOver userId={val} />; }
                  return (
                  // eslint-disable-next-line react/no-array-index-key
                    <Group key={i} align="center" position="apart">
                      <Text transform="capitalize" fz="sm" fw={500}>{`${key}:`}</Text>
                      <Text fz="sm" fw={500}>{modifiedVal}</Text>
                    </Group>

                  );
                })
            }
        </Stack>
      </Paper>
    </Modal>
  );
}

export default TransactionDetailsModal;
