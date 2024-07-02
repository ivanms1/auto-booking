import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';

function ProtectedRoutes() {
  const { user, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
