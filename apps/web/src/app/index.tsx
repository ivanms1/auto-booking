import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { Bounce, ToastContainer } from 'react-toastify';
import routerPath from '@/router/routes';
import '@mantine/core/styles.css';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const TOAST_AUTOCLOSE = 5000;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <MantineProvider>
        <ToastContainer
            autoClose={TOAST_AUTOCLOSE}
            closeOnClick
            draggable
            hideProgressBar
            newestOnTop={false}
            pauseOnFocusLoss
            pauseOnHover
            position='top-center'
            rtl={false}
            theme='colored'
            transition={Bounce}
          />
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
