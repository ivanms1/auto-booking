import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../components/Home'

const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Home />,
  },
]);

function App(): JSX.Element {
  return (
    <div>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </div>
  );
}

export default App;
