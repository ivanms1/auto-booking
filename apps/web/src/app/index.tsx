import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import routerPath from '@/router/routes';
import '@mantine/core/styles.css';

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
            fallbackElement={<p>Initial Load...</p>}
            router={routerPath}
          />
        </MantineProvider>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
