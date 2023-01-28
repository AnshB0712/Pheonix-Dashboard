import {
  ActionIcon, Group, Popover, TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React from 'react';
import PopupForOrderSearch from './PopupForOrderSearch';

function SearchBarForPendingOrders({
  query, setQuery, queriedOrders, completedOrderTab,
}) {
  return (
    <Group my={10} style={{ width: '100%' }}>

      <Popover
        width={302}
        position="bottom-start"
        withArrow
        shadow="md"
        // eslint-disable-next-line eqeqeq
        opened={!queriedOrders?.length && query?.length == 10}
      >
        <Popover.Target>
          <TextInput
            type="number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="sm"
            error={query?.length > 10 && 'Mobile number only contains 10 Digits.'}
            radius={8}
            placeholder="Search Via WhatsApp Number"
            style={{
              width: '100%',
              maxWidth: '330px',
            }}
            rightSection={(
              <ActionIcon disabled={query.length !== 10}>
                <IconSearch size={18} />
              </ActionIcon>
          )}
          />
        </Popover.Target>
        {!completedOrderTab && (
        <Popover.Dropdown sx={{ pointerEvents: 'none', maxHeight: 350, overflow: 'scroll' }}>
          <PopupForOrderSearch query={query} />
        </Popover.Dropdown>
        )}
      </Popover>
    </Group>
  );
}

export default SearchBarForPendingOrders;
