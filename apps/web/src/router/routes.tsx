import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Users from '@/pages/Users';
import Bookings from '@/pages/Bookings';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';

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
        id: 'about',
        path: '/about',
        element: <p>About</p>,
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
    ],
  },
]);

export default routerPath;
