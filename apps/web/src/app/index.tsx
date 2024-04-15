import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../router/routes';

function App(): JSX.Element {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}

export default App;
