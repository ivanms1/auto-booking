import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const ITEMS = [
  { label: 'HOME', path: '/' },
  { label: 'USERS', path: '/users' },
  { label: 'BOOKINGS', path: '/bookings' },
  { label: 'CARS', path: '/cars' },
  { label: 'ROOMS', path: '/rooms' },
];

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <p className={styles.title}>SIDEBAR</p>
      <ul>
        {ITEMS.map((item) => (
          <li className={styles.li} key={item.label}>
            <Link className={styles.link} to={item.path}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
