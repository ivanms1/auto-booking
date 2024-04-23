import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/components/Layout';
import Users from '@/pages/Users';
import Bookings from '@/pages/Bookings';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Cars from '@/pages/Cars';
import Rooms from '@/pages/Rooms';

const routerPath = createBrowserRouter([
  {
    id: 'root',
    element: <Layout />,
    children: [
      {
        id: 'home',
        path: '/',
        element: <Home />,
      },
      {
        id: 'cars',
        path: '/cars',
        element: <Cars />,
      },
      {
        id: 'users',
        path: '/users',
        element: <Users />,
      },
      {
        id: 'bookings',
        path: '/bookings',
        element: <Bookings />,
      },
      {
        id: 'profile',
        path: '/profile',
        element: <Profile />,
      },
      {
        id: 'login',
        path: '/login',
        element: <Login />,
      },
      {
        id: 'rooms',
        path: '/rooms',
        element: <Rooms />,
      },
    ],
  },
]);

export default routerPath;
