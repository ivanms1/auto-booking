import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useGetCurrentUser from '@/hooks/useGetCurrentUser';

const ProtectedRoutes = () => {
  const { user, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
