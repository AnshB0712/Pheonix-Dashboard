import React from 'react';
import {
  ActionIcon,
  AspectRatio,
  Group, Highlight, Image, Popover, Stack, Switch, Text, Title,
} from '@mantine/core';
import {
  useDisclosure, useToggle,
} from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { IconPencil, IconTrash } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import useChangeInStockStatus from '../../../hooks/useChangeInStockStatus';
import customAxios from '../../../api/axios';
import { SUCCESS_NOTIFY } from '../../../constants';

function CatalogueCards({
  data: {
    name, imageURL, perPrice, _id, inStock,
  },
  catalogueMutate,
  query,
}) {
  const navigate = useNavigate(); return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '120px auto',
        alignItems: 'center',
        border: '1px solid #CED4DA',
        borderRadius: '5px',
        // maxWidth: '430px',
        overflow: 'hidden',
        padding: '5px',
      }}
    >
      <AspectRatio ratio={16 / 9}>
        <Image fit="cover" src={imageURL} alt={name} />
      </AspectRatio>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '5px 10px',
        }}
      >
        <Highlight highlight={`${query}`} component={Title} order={6} tt="capitalize">{name}</Highlight>
        <Text style={{ marginTop: 'auto' }} color="dimmed" fw={500} fz="md">{`₹${perPrice}`}</Text>
        <Group style={{ width: '100%' }} align="center" noWrap position="apart">
          <ActionIcon
            size="md"
            variant="outline"
            color="blue"
            onClick={() => navigate(`/catalogue/forms/${_id}`)}
          >
            <IconPencil size={18} />
          </ActionIcon>
          <DeleteButton catalogueMutate={catalogueMutate} id={_id} />
          <ToggleInStockStatus id={_id} inStock={inStock} />
        </Group>
      </div>
    </div>
  );
}

function ToggleInStockStatus({ id, inStock }) {
  const [value, toggle] = useToggle([inStock, !inStock]);
  const [opened, { close, open }] = useDisclosure(false);
  const { trigger } = useChangeInStockStatus();

  const handleChange = async () => {
    await trigger({ id, inStock: !value });
    toggle();
  };

  return (
    <Popover width={200} position="right" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Stack spacing={0} onMouseEnter={open} onMouseLeave={close}>
          <Text ta="center" size={12} fw={600} color={value ? 'green' : 'red'}>
            {value ? 'Available' : 'Removed'}
          </Text>
          <Switch
            size="xs"
            color="teal"
            styles={() => ({
              body: {
                display: 'grid',
                placeItems: 'center',
              },
            })}
            checked={value}
            onChange={handleChange}
            style={{ display: 'grid' }}
          />
        </Stack>
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text ta="center" size="sm">This shows the status to the user if the dish is available to order or not.</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

function DeleteButton({ id, catalogueMutate }) {
  const handleClick = async () => {
    const { data } = await customAxios.delete('/admin/delete-a-dish', { params: { id } });
    await catalogueMutate();
    showNotification({ ...SUCCESS_NOTIFY, message: data?.message });
  };
  return (
    <ActionIcon color="red" variant="outline" size="md" onClick={() => handleClick(id)}>
      <IconTrash size={18} />
    </ActionIcon>
  );
}

export default CatalogueCards;
