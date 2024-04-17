import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerPath from '@/router/routes';

function App(): JSX.Element {
  return (
    <RouterProvider
      router={routerPath}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}

export default App;
