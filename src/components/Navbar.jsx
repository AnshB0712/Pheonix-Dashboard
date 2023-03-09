import React from 'react';
import {
  Group, Navbar as MantineNavbar, Switch, Text, ThemeIcon, UnstyledButton,
} from '@mantine/core';
import { IconChevronRight, IconMoonStars, IconPower } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import { NAVLINK_DATA } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useOrderContext } from '../context/OrdersContext';

function MainLink({
  icon, color, label, to, setOpen, disabled,
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
        pointerEvents: disabled ? 'none' : 'auto',
        filter: disabled && label !== 'Login' ? 'grayscale(80%)' : 'grayscale(0%)',

        '&:hover': {
          backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component={NavLink}
      to={to}
      onClick={() => setOpen(true)}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>

      <IconChevronRight color="#A6A7AB" />
    </UnstyledButton>
  );
}

function Links({ setOpen }) {
  const { user } = useAuth();
  const mediaQ = useMediaQuery('(min-width:1000px)');

  const links = NAVLINK_DATA.map((link) => {
    if (user.user?.token && link.label === 'Login') return;
    if (mediaQ && link.label === 'Summary') return;
    // eslint-disable-next-line consistent-return, react/jsx-props-no-spreading
    return <MainLink disabled={!user.user?.token} setOpen={setOpen} {...link} key={link.label} />;
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
        <LogoutButton />
        <ThemeSwitch colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
      </MantineNavbar.Section>
    </MantineNavbar>
  );
}

function LogoutButton() {
  const { dispatch, user } = useAuth();
  const { wokeUp } = useOrderContext();
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT_USER' });
    wokeUp.current = 0;
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!user.user?.token) return <></>;
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
      onClick={handleLogout}
    >
      <Group>
        <ThemeIcon variant="light">
          <IconPower size={18} color="red" />
        </ThemeIcon>

        <Text size="md">Logout</Text>
      </Group>
    </UnstyledButton>
  );
}

function ThemeSwitch({ colorScheme, toggleColorScheme }) {
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
    >
      <Group>
        <ThemeIcon color="yellow" variant="light">
          <IconMoonStars size={18} />
        </ThemeIcon>

        <Text size="md">Dark Mode</Text>
      </Group>
      <Switch checked={colorScheme === 'dark'} onChange={() => toggleColorScheme()} style={{ display: 'grid' }} />
    </UnstyledButton>
  );
}

export default Navbar;
