import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  // eslint-disable-next-line no-nested-ternary
  return (user?.token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />);
}

export default ProtectedRoute;
