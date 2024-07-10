import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { Notifications } from '@mantine/notifications';
import routerPath from '@/router/routes';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const TOAST_AUTOCLOSE = 5000;
//const ZINDEX = 1000

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <MantineProvider>
        <Notifications autoClose={TOAST_AUTOCLOSE} position="top-center"/>
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
