import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerPath from '@/router/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <RouterProvider
        router={routerPath}
        fallbackElement={<p>Initial Load...</p>}
      />
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
