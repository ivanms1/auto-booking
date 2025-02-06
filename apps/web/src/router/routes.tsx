import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Users from '@/pages/Users';
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import Login from '@/pages/Login';
import Cars from '@/pages/Cars';
import Rooms from '@/pages/Rooms';
import ProtectedRoutes from '@/components/ProtectedRoutes';
import BookingsCar from '@/pages/BookingsCar/BookingsCar';
import BookingsRoom from '@/pages/BookingsRooms/BookingsRoom';

const routerPath = createBrowserRouter([
  {id: 'protectedroutes',
    element: <ProtectedRoutes />,
    children: [
      {
        id: 'layout',
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
            id: 'bookingsCar',
            path: '/bookingsCar',
            element: <BookingsCar />,
          },
          {
            id: 'bookingsRoom',
            path: '/bookingsRoom',
            element: <BookingsRoom />,
          },
          {
            id: 'profile',
            path: '/profile',
            element: <Profile />,
          },
          {
            id: 'rooms',
            path: '/rooms',
            element: <Rooms />,
          },
        ],
      },

    ]
  },
  {
    id: 'login',
    path: '/login',
    element: <Login />,
  },
]);

export default routerPath;
