import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import refreshAccessToken from '../api/refreshAccessToken';
import { useAuth } from '../context/AuthContext';

function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const { user, dispatch } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const token = await refreshAccessToken();
        dispatch({ action: { type: 'USER_DATA', payload: { token } } });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
      // eslint-disable-next-line no-unused-expressions
    !user.user?.token ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    // eslint-disable-next-line no-nested-ternary
    user.user
      ? loading ? <p>Loading...</p> : <Outlet />
      : <Outlet />
  );
}

export default PersistLogin;
