import React, { useState, useEffect } from 'react';
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
  Checkbox,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import customAxios from '../api/axios';

function AuthForm() {
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    persist: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser, user } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || '/orders';

  const handleChange = (e) => {
    setFormValues((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await customAxios.post('/admin/login', formValues);
      setUser({ token: data.token });
      // eslint-disable-next-line no-unused-expressions
      formValues.persist && localStorage.setItem('auth_persist', formValues.persist);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) { setError(''); }
  }, [formValues]);

  useEffect(() => {
    if (!user?.token) return;
    navigate('/orders');
  }, []);

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
          <LoadingOverlay visible={loading} />
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

          <Checkbox
            size="xs"
            radius="sm"
            mt="md"
            checked={formValues.persist}
            labelPosition="left"
            label="Remember Me"
          />

          {error && (
            <Text color="red" size="sm" mt="sm" ta="center" fw={500}>
              {`ERR: ${error}`}
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
