import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from '../components/Home';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Home />,
  },
]);

function App(): JSX.Element {
  return (
    <Layout>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </Layout>
  );
}

export default App;
