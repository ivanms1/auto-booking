import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Popover } from '@mantine/core';
import styles from './Navbar.module.css';
import Bell from '@/assets/svg/bell.svg?react';
import ProfilePicture from '@/assets/svg/27716.svg?react';
import { setToken } from '@/utils/request';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';

function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [_cookies, _setCookie, removeCookie] = useCookies(['accessToken']);

  const { user } = useGetCurrentUser();

  const [opened, setOpened] = useState(false);

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
      <div className={styles.search} />
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Bell />
        </div>
        <Popover onChange={setOpened} opened={opened}  // Pasamos el estado 'opened' al Popover
      position='bottom' shadow='md' width={150} withArrow>
          <Popover.Target>
            <div>
              {user?.avatar ? (
                <button className={styles.avatarButton} onClick={() => { setOpened((o) => !o); }} type="button">
                <img
                  alt='ProfilePicture'
                  className={styles.profilePicture}
                  src={user.avatar}
                />
                </button>
              ) : (
                <ProfilePicture className={styles.imageInside} />
              )}
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
                      setOpened((o) => !o)
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
