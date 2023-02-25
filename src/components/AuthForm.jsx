import React, { useEffect, useState } from 'react';
import { IconLock, IconAt } from '@tabler/icons';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Text,
  LoadingOverlay,
  Group,
  Title,
  Container,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthForm() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });
  const { dispatch, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'INITIATE_USER_AUTH',
      payload: formValues,
    });
  };

  useEffect(() => {
    if (!user.user?.token) return;
    navigate('/orders');
  }, [user.user]);

  return (
    <Container
      backgroundColor="white"
      style={{
        maxWidth: '400px',
      }}
    >
      <Paper
        p="md"
        shadow="sm"
        styles={(theme) => ({
          position: 'relative',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Title order={4} ta="center">Authentication Form</Title>
        <form onSubmit={(e) => handleSubmit(e)}>
          <LoadingOverlay visible={user?.isUserLoading} />
          <TextInput
            mt="md"
            required
            placeholder="Your Username"
            label="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            icon={<IconAt size={16} stroke={1.5} />}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Your Password"
            label="Password"
            name="password"
            icon={<IconLock size={16} stroke={1.5} />}
            onChange={(e) => handleChange(e)}
          />

          {user.userError && (
            <Text color="red" size="sm" mt="sm" ta="center" fw={500}>
              {`ERR: ${user.userError?.message}`}
            </Text>
          )}

          <Group mt="md">
            <Button color="blue" type="submit" fullWidth>
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default AuthForm;
