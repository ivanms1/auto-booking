import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Popover } from '@mantine/core';
import styles from './Navbar.module.css';
import Input from '@/components/Input';
import Bell from '@/assets/svg/bell.svg?react';
import ProfilePicture from '@/assets/svg/profile.svg?react';
import Button from '@/components/Button';
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
      <div className={styles.search}>
        <Input className={styles.inputSearch} placeholder='Search' />
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Bell />
        </div>
        <Popover position='bottom' shadow='md' width={200} withArrow>
          <Popover.Target>
            <div>
              <ProfilePicture className={styles.imageInside} />
            </div>
          </Popover.Target>
          <Popover.Dropdown>
            <div className={styles.picturePosition}>
              <ProfilePicture className={styles.imageInside} />
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  handleClick('/profile');
                }}
                variant='primary'
              >
                Profile
              </Button>
              <Button
                onClick={() => {
                  logout();
                }}
                variant='danger'
              >
                Logout
              </Button>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
    </nav>
  );
}

export default Navbar;
