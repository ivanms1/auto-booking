import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Navbar />
        <div className={styles.children}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
