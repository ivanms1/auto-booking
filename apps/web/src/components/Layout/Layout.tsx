import React from 'react';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from './Layout.module.css';

const TOAST_AUTOCLOSE = 5000;

function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Navbar />
        <div className={styles.children}>
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
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
