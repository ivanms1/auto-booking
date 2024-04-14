import React from 'react';
import { RouterProvider } from 'react-router-dom';
import browserRouter from '../components/BroserRouter';

function App(): JSX.Element {
  return (
    <RouterProvider
      router={browserRouter}
      fallbackElement={<p>Initial Load...</p>}
    />
  );
}

export default App;
