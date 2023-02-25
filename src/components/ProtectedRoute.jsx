import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { user } = useAuth();

  // eslint-disable-next-line no-nested-ternary
  return (user.user?.token ? <Outlet /> : <Navigate to="/" />);
}

export default ProtectedRoute;
