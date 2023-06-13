import React from 'react';
import {
  Burger, Header as MantineHeader, MediaQuery, Title,
} from '@mantine/core';

function Header({
  setOpen, open,
}) {
  return (
    <MantineHeader height={60} p="xs">
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%',
        }}
      >
        <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
          <Burger
            opened={!open}
            onClick={() => setOpen((o) => !o)}
            size="md"
          />
        </MediaQuery>
        <Title ta="center" order={2} style={{ margin: '0 auto' }}>HungryHubs Dashboard</Title>
      </div>
    </MantineHeader>
  );
}

export default Header;
