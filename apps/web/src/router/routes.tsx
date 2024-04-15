import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from 'src/components/Layout';
import Home from 'src/components/Home';
import Documentation from 'src/components/Dashboard/Documentation';
import Pages from 'src/components/Dashboard/Pages';
import Profile from 'src/components/Dashboard/Profile';
import Features from 'src/components/Dashboard/Features';

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
