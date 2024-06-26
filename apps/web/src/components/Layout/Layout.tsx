import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

import styles from './Layout.module.css';
import { Bounce, ToastContainer } from 'react-toastify';

const TOAST_AUTOCLOSE = 5000

function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Navbar />
        <div className={styles.children}>
          <ToastContainer
            position='top-center'
            autoClose={TOAST_AUTOCLOSE}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
            transition={Bounce}
          />
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
