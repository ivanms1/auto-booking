import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'Users', path: '/users' },
  { label: 'Bookings', path: '/bookings' },
  { label: 'Cars', path: '/cars' },
  { label: 'Rooms', path: '/rooms' },
];

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.links}>
        {ITEMS.map((item) => (
          <Link className={styles.link} key={item.label} to={item.path}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
