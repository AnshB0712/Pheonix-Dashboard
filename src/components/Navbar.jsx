import React from 'react';
import {
  Group, Navbar as MantineNavbar, Switch, Text, ThemeIcon, UnstyledButton,
} from '@mantine/core';
import { IconChevronRight, IconMoonStars } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { NAVLINK_DATA } from '../constants';
import { useAuth } from '../context/AuthContext';

function MainLink({
  icon, color, label, to, setOpen, colorScheme, toggleColorScheme,
}) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: theme.spacing.sm,
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: 10,
        marginBottom: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component={to ? NavLink : UnstyledButton}
      to={to}
      onClick={() => (to ? setOpen(true) : undefined)}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>

      {to
        ? <IconChevronRight color="#A6A7AB" />
        : <Switch checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} style={{ display: 'grid' }} />}
    </UnstyledButton>
  );
}

function Links({ setOpen }) {
  const { user } = useAuth();
  const links = NAVLINK_DATA.map((link) => {
    if (user?.token && link.label === 'Login') return;
    // eslint-disable-next-line consistent-return
    return <MainLink setOpen={setOpen} {...link} key={link.label} />;
  });
  return <div>{links}</div>;
}

function Navbar({
  open, setOpen, colorScheme, toggleColorScheme,
}) {
  return (
    <MantineNavbar width={{ xs: 250, sm: 280 }} hidden={open} height="100%" p="xs">
      <MantineNavbar.Section>
        <Text fw={500} fz={18} ta="center">Helpful Links</Text>
      </MantineNavbar.Section>
      <MantineNavbar.Section grow mt="md">
        <Links setOpen={setOpen} />
        {/* DARK MODE SWITCH */}
        <MainLink icon={<IconMoonStars size={18} />} label="Dark Mode" color="yellow" colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

export default Navbar;
