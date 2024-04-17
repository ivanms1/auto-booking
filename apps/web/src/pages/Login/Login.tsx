import React from 'react';
import styles from './Login.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';

function Login() {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.username}>
          <p>Username</p>
          <Input placeholder=''></Input>
        </div>
        <div className={styles.username}>
          <p>Password</p>
          <Input placeholder=''></Input>
        </div>
        <Button title='Sign In' ></Button>
        <div className={styles.footer}>
          <p className={styles.wordfooter1}>Create an Account</p>
          <p className={styles.wordfooter2}>Forgot Password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
