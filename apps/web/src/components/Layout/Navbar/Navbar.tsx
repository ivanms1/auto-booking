import React from 'react';
import styles from './Navbar.module.css';
import Input from '@/components/Input';
import Bell  from "@/assets/svg/bell.svg?react";
import ProfilePicture from "@/assets/svg/profile.svg?react";

import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

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
