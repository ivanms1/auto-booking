import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { rem } from '@mantine/core';
import {
  IconHome,
  IconUser,
  IconBrandBooking,
  IconCar,
  IconDoor,
} from '@tabler/icons-react';
import classNames from 'classnames';
import styles from './Sidebar.module.css';

const iconProps = {
  color: 'var(--light)',
  stroke: 1.5,
  style: { width: rem(15), height: rem(15) },
};

const ITEMS = [
  { label: 'Home', path: '/', icon: <IconHome {...iconProps} /> },
  { label: 'Users', path: '/users', icon: <IconUser {...iconProps} /> },
  { label: 'Cars', path: '/cars', icon: <IconCar {...iconProps} /> },
  { label: 'Rooms', path: '/rooms', icon: <IconDoor {...iconProps} /> },
];

function Sidebar() {
  const location = useLocation();
  return (
    <div className={styles.sidebar}>
      <div className={styles.links}>
        <p className={styles.title}>
          AUTO
          <br />
          BOOKING
        </p>
        {ITEMS.map((item) => (
          <Link
            className={classNames(styles.link, {
              [styles.active]: location.pathname === item.path,
            })}
            key={item.label}
            to={item.path}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
