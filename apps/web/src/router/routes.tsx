import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Documentation from '../components/Dashboard/Documentation';
import Pages from '../components/Dashboard/Pages';
import Profile from '../components/Dashboard/Profile';
import Features from '../components/Dashboard/Features';

const router = createBrowserRouter([
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
        id: 'features',
        path: '/features',
        element: <Features />,
      },
      {
        id: 'profile',
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
