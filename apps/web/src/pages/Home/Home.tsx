import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Button from '@/components/Button';

function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.div}>
        <div className={styles.top}>
          <h1 className={styles.title}>User</h1>
          <p className={styles.p}>Welcolme to the Booking page</p>
        </div>
        <div className={styles.buttons}>
          <div className={styles.box}>
            <p className={styles.p2}>
              Go to the calendar to check the bookings
            </p>
            <Link to='/bookings'>
              <Button className={styles.button} outline variant='primary'>
                GO TO BOOKINGS
              </Button>
            </Link>
          </div>
          <div className={styles.box}>
            <p className={styles.p2}>Go to check the available cars</p>
            <Link to='/cars'>
              <Button className={styles.button} outline variant='primary'>
                GO TO CARS
              </Button>
            </Link>
          </div>
          <div className={styles.box}>
            <p className={styles.p2}>Go to check the available rooms</p>
            <Link to='/rooms'>
              <Button className={styles.button} outline variant='primary'>
                GO TO ROOMS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
