import React, { useEffect } from 'react';
import styles from './Login.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '@/services/login';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
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
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setCookie('accessToken', data.accessToken);
        navigate('/');
        toast.success('Login Succes!');
        setToken(data.accessToken);
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message
          ? error.response?.data.message
          : '';
        toast.error(errorMessage);
        reset();
      },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <p className={styles.title}>Please enter you user information.</p>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.username}>
            <label className={styles.inputInfo}>Email</label>
            <Input className={styles.inputLogin} {...register('email')}></Input>
          </div>
          {errors.email?.message && (
            <p className={styles.errorAlert}>{errors.email.message}</p>
          )}
          <div className={styles.username}>
            <label className={styles.inputInfo}>Password</label>
            <Input
              className={styles.inputLogin}
              {...register('password')}
            ></Input>
          </div>
          {errors.password?.message && (
            <p className={styles.errorAlert}>{errors.password.message}</p>
          )}
          <div className={styles.outsideButton}>
            <Button
              variant='primary'
              className={styles.loginButton}
              type='submit'
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
