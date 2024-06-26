import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Input from '@/components/Input';
import Bell from '@/assets/svg/bell.svg?react';
import ProfilePicture from '@/assets/svg/profile.svg?react';
import { useFloating, offset } from '@floating-ui/react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';
import { useQueryClient } from '@tanstack/react-query';
import { setToken } from '@/utils/request';

function Navbar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [_cookies, _setCookie, removeCookie] = useCookies(['accessToken']);

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset({ mainAxis: 10, crossAxis: 525 })],
  });

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
    <nav ref={refs.setReference} className={styles.navbar}>
      <div className={styles.search}>
        <Input placeholder='Search' className={styles.inputSearch} />
      </div>
      <div className={styles.icons}>
        <div className={styles.icon}>
          <Bell />
        </div>
        <div className={styles.icon} onClick={() => setIsOpen((prev) => !prev)}>
          <ProfilePicture />
        </div>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className={styles.floatingModule}
          >
            <ProfilePicture className={styles.imageInside} />
            <div className={styles.buttons}>
              <Button onClick={() => handleClick('/profile')} variant='primary'>
                Profile
              </Button>
              <Button onClick={() => logout()} variant='danger'>
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
