import React from 'react';
import styles from './Navbar.module.css';
import Input from '../../../Input';
import ProfilePicture from '../../Icons/Profile';
import Bell from '../../Icons/Bell';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate()

  function handleClick(route: string) {
    navigate(route);
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.search}>
        <Input placeholder='Search' />
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Bell />
        </div>
        <div className={styles.icon} onClick={() => handleClick('/profile')}>
          <ProfilePicture />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
