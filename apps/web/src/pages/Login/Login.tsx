import React from 'react';
import styles from './Login.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';

function Login() {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <p className={styles.title}>Please enter you user information.</p>
        <div className={styles.username}>
          <p className={styles.inputInfo}>Username</p>
          <Input className={styles.inputLogin}></Input>
        </div>
        <div className={styles.username}>
          <p className={styles.inputInfo}>Password</p>
          <Input className={styles.inputLogin}></Input>
        </div>
        <div className={styles.outsideButton}>
          <Button variant='primary' className={styles.loginButton}>
            Signin
          </Button>
        </div>
        <div className={styles.footer}>
          <p className={styles.wordfooter1}>Create an Account</p>
          <p className={styles.wordfooter2}>Forgot Password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
