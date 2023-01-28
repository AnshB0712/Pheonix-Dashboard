import {
  Group, Loader, Text, Title,
} from '@mantine/core';
import React from 'react';
import { ReactComponent as Puzzle } from '../assets/Puzzle.svg';
import { ReactComponent as ErrorServer } from '../assets/ErrorServer.svg';
import { ReactComponent as Astronaut } from '../assets/Astronaut.svg';

const LookUpObject = {
  0: {
    component: <Puzzle style={{ width: '70%' }} />,
    title: 'No Data To Show',
    body: 'Sorry, for the emptiness in your life because of us.',
  },
  1: {
    component: <ErrorServer style={{ width: '70%' }} />,
    title: 'Encountered an Error',
    body: "OOP's, please try again later!",
  },
  2: {
    component: <Astronaut style={{ width: '70%' }} />,
    title: 'Data Is Empty.',
    body: 'Let users make some request for them to show here',
  },
  3: {
    component: <Loader size="sm" />,
  },
};

function EmptyStateComponent({ index, title, body }) {
  const { component, title: lookupTitle, body: lookupBody } = LookUpObject[index];
  return (
    <Group position="center" spacing="xs">
      {component}
      <Title order={5}>{title || lookupTitle || ''}</Title>
      <Text fw={400} fz="md" color="dimmed" ta="center">{body || lookupBody || ''}</Text>
    </Group>
  );
}

export default EmptyStateComponent;
