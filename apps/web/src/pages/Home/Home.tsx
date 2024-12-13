import React from 'react';
import { Link } from 'react-router-dom';
import { rem } from '@mantine/core';
import {
  IconBrandBooking,
  IconCar,
  IconDoor,
} from '@tabler/icons-react';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.div}>
        <div className={styles.top}>
          <h1 className={styles.title}>User</h1>
        </div>
        <div className={styles.buttons}>
          <div className={styles.box}>
            <div className={styles.up}>
              <p className={styles.p2}>Bookings</p>
              <span className={styles.outIconBooking}>
                <Link className={styles.link} to='/bookings'>
                  <IconBrandBooking
                    color='var(--purewhite)'
                    stroke={1.5}
                    style={{ width: rem(25), height: rem(25) }}
                  />
                </Link>
              </span>
            </div>
            <p className={styles.p2}>
              Check de available <b>bookings</b>
            </p>
          </div>
          <div className={styles.box}>
          <div className={styles.up}>
              <p className={styles.p2}>Cars</p>
              <span className={styles.outIconCar}>
                <Link className={styles.link} to='/cars'>
                  <IconCar
                    color='var(--purewhite)'
                    stroke={1.5}
                    style={{ width: rem(25), height: rem(25) }}
                  />
                </Link>
              </span>
            </div>
            <p className={styles.p2}>
              Check de available <b>cars</b>
            </p>
          </div>
          <div className={styles.box}>
          <div className={styles.up}>
              <p className={styles.p2}>Rooms</p>
              <span className={styles.outIconRoom}>
                <Link className={styles.link} to='/rooms'>
                  <IconDoor
                    color='var(--purewhite)'
                    stroke={1.5}
                    style={{ width: rem(25), height: rem(25) }}
                  />
                </Link>
              </span>
            </div>
            <p className={styles.p2}>
              Check de available <b>rooms</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
