import React from 'react';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';

const ITEMS = [{label: 'HOME', path: '/'}, {label: 'FEATURES', path: '/features'}, {label: 'DOCUMENTATION', path: '/documentation'}, {label: 'PAGES', path: '/pages'}]

function Sidebar() {

  return (
    <div className={styles.sidebar}>
      <p className={styles.title}>SIDEBAR</p>
      <ul>
        {ITEMS.map((item, i) => (<li key={i}  className={styles.li} ><Link to={item.path} className={styles.link}>{item.label}</Link></li>))}
      </ul>

    </div>
  );
}

export default Sidebar;
