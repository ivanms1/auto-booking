import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';

function AdminRoute() {
  const { user, isLoading } = useGetCurrentUser();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      notifications.show({
        title: 'Only Admin can access this page',
        message: 'You are not authorized to access this page',
        color: 'red',
      });
    }
  }, [isLoading, user]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate replace to="/" />;
  }

  return <Outlet />;
}

export default AdminRoute;