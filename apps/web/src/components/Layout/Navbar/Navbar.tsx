import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Popover } from '@mantine/core';
import styles from './Navbar.module.css';
import Bell from '@/assets/svg/bell.svg?react';
import ProfilePicture from '@/assets/svg/profile.svg?react';
import { setToken } from '@/utils/request';

function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_cookies, _setCookie, removeCookie] = useCookies(['accessToken']);

  function handleClick(route: string) {
    navigate(route);
  }

  function logout() {
    removeCookie('accessToken');
    queryClient.clear();
    setToken('');
    navigate('/login');
  }
  return (
    <nav className={styles.navbar}>
      <div className={styles.search}/>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Bell />
        </div>
        <Popover position='bottom' shadow='md' width={150} withArrow>
          <Popover.Target>
            <div>
              <ProfilePicture className={styles.imageInside} />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <div className={styles.buttons}>
              <ul className={styles.ul}>
                <div className={styles.hover}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      handleClick('/profile');
                    }}
                    type='button'
                  >
                    <li>Profile</li>
                  </button>
                </div>
                <div className={styles.hover}>
                  <button
                    className={styles.button}
                    onClick={() => {
                      logout();
                    }}
                    type='button'
                  >
                    <li>Logout</li>
                  </button>
                </div>
              </ul>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    </nav>
  );
}

export default Navbar;
