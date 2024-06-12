import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerPath from '@/router/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <MantineProvider>
          <RouterProvider
            router={routerPath}
            fallbackElement={<p>Initial Load...</p>}
          />
        </MantineProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
