import React from 'react';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Navbar />
        <div className={styles.children}> {children}</div>
      </main>
    </div>
  );
}

export default Layout;
