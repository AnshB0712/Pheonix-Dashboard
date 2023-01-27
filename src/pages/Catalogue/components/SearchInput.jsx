import { ActionIcon, TextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons';
import React from 'react';

function SearchInput({ setQuery, query }) {
  return (
    <TextInput
      placeholder="Search"
      radius="md"
      size="sm"
      type="text"
      icon={<IconSearch size={18} />}
      rightSection={(
        <ActionIcon size="xs" variant="subtle" radius="sm" onClick={() => setQuery('')}>
          <IconX size={14} />
        </ActionIcon>
          )}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default SearchInput;
