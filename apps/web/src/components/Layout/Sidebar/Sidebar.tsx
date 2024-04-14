import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();

  function handleClick(route: string) {
    navigate(route);
  }

  return (
    <div className={styles.sidebar}>
      <p className={styles.title}>SIDEBAR</p>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={() => handleClick('/')}>HOME</li>
        <li className={styles.li} onClick={() => handleClick('/dashboard')}>DASHBOARD</li>
        <li className={styles.li} onClick={() => handleClick('/documentation')}>DOCUMENTATION</li>
        <li className={styles.li} onClick={() => handleClick('/pages')}>PAGES</li>
      </ul>

    </div>
  );
}

export default Sidebar;
