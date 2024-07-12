import React, { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import styles from './Login.module.css';
import { useLogin } from '@/services/login';
import Input from '@/components/Input';
import Button from '@/components/Button';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';
import { setToken } from '@/utils/request';

const loginSchema = z.object({
  email: z.string().email('This is not a valid email'),
  password: z.string().min(6, { message: 'Please enter a valid password' }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

function Login() {
  const [, setCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const { user } = useGetCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<LoginSchemaType> = (data: LoginSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: (successData) => {
        setCookie('accessToken', successData.accessToken);
        navigate('/');
        setToken(successData.accessToken);
        notifications.show({
          title: 'Success',
          message: 'Login Success',
          color: 'green',
        });
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message
          ? error.response.data.message
          : '';

        notifications.show({
          title: 'Error',
          message: errorMessage ? errorMessage : 'Error',
          color: 'red',
        });
      },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <p className={styles.title}>Please enter you user information.</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.username}>
            <label className={styles.inputInfo} htmlFor='email'>
              Email
            </label>
            <Input
              className={styles.inputLogin}
              id='email'
              {...register('email')}
            />
          </div>
          {errors.email?.message ? (
            <p className={styles.errorAlert}>{errors.email.message}</p>
          ) : null}
          <div className={styles.username}>
            <label className={styles.inputInfo} htmlFor='password'>
              Password
            </label>
            <Input
              className={styles.inputLogin}
              id='password'
              type='password'
              {...register('password')}
            />
          </div>
          {errors.password?.message ? (
            <p className={styles.errorAlert}>{errors.password.message}</p>
          ) : null}
          <div className={styles.outsideButton}>
            <Button
              className={styles.loginButton}
              type='submit'
              variant='primary'
            >
              Signin
            </Button>
          </div>
        </form>
        <div className={styles.footer}>
          <p className={styles.wordfooter1}>Create an Account</p>
          <p className={styles.wordfooter2}>Forgot Password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
