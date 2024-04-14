import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Documentation from '../routes/Documentation';
import Pages from '../routes/Pages';
import Dashboard from '../routes/Dashboard';
import Home from '../Home';
import Layout from '../Layout';
import Profile from '../routes/Profile';

const browserRouter = createBrowserRouter([
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
        id: 'documentation',
        path: '/documentation',
        element: <Documentation />,
      },
      {
        id: 'pages',
        path: '/pages',
        element: <Pages />,
      },
      {
        id: 'dashboard',
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        id: 'profile',
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default browserRouter;
