import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import refreshAccessToken from '../api/refreshAccessToken';
import { useAuth } from '../context/AuthContext';

function PersistLogin() {
  const persist = localStorage.getItem('auth_persist');
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      setLoading(true);
      try {
        const token = await refreshAccessToken();
        setUser({ token });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line no-unused-expressions
    !user?.token && persist ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    // eslint-disable-next-line no-nested-ternary
    persist ? loading ? <p>Loading...</p> : <Outlet /> : <Outlet />
  );
}

export default PersistLogin;
