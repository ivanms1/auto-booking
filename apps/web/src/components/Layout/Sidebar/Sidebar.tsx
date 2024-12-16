import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { rem } from '@mantine/core';
import { IconHome, IconUser, IconBrandBooking, IconCar, IconDoor } from '@tabler/icons-react';
import styles from './Sidebar.module.css';


const ITEMS = [
  { label: 'Home', path: '/', icon: <IconHome
    color="var(--light)"
    stroke={1.5}
    style={{ width: rem(15), height: rem(15) }}
  />},
  { label: 'Users', path: '/users', icon: <IconUser
    color="var(--light)"
    stroke={1.5}
    style={{ width: rem(15), height: rem(15) }}
  /> },
  { label: 'Bookings', path: '/bookings', icon: <IconBrandBooking
    color="var(--light)"
    stroke={1.5}
    style={{ width: rem(15), height: rem(15) }}
  /> },
  { label: 'Cars', path: '/cars', icon: <IconCar
    color="var(--light)"
    stroke={1.5}
    style={{ width: rem(15), height: rem(15) }}
  /> },
  { label: 'Rooms', path: '/rooms', icon: <IconDoor
    color="var(--light)"
    stroke={1.5}
    style={{ width: rem(15), height: rem(15) }}
  /> },
];

function Sidebar() {
  const location = useLocation();
  return (
    <div className={styles.sidebar}>
      <div className={styles.links}>
        <p className={styles.title}>AUTO<br/>BOOKING</p>
        {ITEMS.map((item) => (
          <Link className={`${styles.link} ${location.pathname === item.path ? styles.active : ''}`} key={item.label} to={item.path}>
            {item.icon} {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
