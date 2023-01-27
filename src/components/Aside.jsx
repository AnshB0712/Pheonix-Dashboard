import React from 'react';
import { Aside as MantineAside, MediaQuery } from '@mantine/core';
import AsideWrapper from '../pages/Aside';

function Aside() {
  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <MantineAside hiddenBreakpoint="md" width={{ sm: 200, lg: 280 }}>
        <AsideWrapper />
      </MantineAside>
    </MediaQuery>

  );
}

export default Aside;
