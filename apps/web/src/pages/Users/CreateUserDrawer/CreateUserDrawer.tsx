import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Drawer } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import styles from './CreateUserDrawer.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useCreateUser } from '@/services/users';
import { userQueryKeys } from '@/services/users/request';

const createUserSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must contain at least 2 characters'),
    email: z.string().trim().email('Enter a valid email'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type CreateUserForm = z.infer<typeof createUserSchema>;

interface CreateUserDrawerProps {
  opened: boolean;
  onClose: () => void;
}

function CreateUserDrawer({ opened, onClose }: CreateUserDrawerProps) {
  const createUser = useCreateUser();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
  });

  const closeAndReset = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<CreateUserForm> = ({
    name,
    email,
    password,
  }) => {
    createUser.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: userQueryKeys.list().queryKey,
          });
          notifications.show({
            title: 'Success',
            message: 'User created successfully',
            color: 'green',
          });
          closeAndReset();
        },
        onError: (error) => {
          notifications.show({
            title: 'Error',
            message: error.response?.data.message ?? 'Could not create user',
            color: 'red',
          });
        },
      }
    );
  };

  return (
    <Drawer
      onClose={closeAndReset}
      opened={opened}
      position='right'
      size='md'
      title='Create user'
    >
      <form
        className={styles.form}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <div className={styles.field}>
          <label className={styles.label} htmlFor='name'>Name</label>
          <Input id='name' type='text' {...register('name')} />
          {errors.name?.message ? (
            <p className={styles.errorAlert}>{errors.name.message}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='email'>Email</label>
          <Input id='email' type='email' {...register('email')} />
          {errors.email?.message ? (
            <p className={styles.errorAlert}>{errors.email.message}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='password'>Password</label>
          <Input id='password' type='password' {...register('password')} />
          {errors.password?.message ? (
            <p className={styles.errorAlert}>{errors.password.message}</p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='confirmPassword'>
            Confirm password
          </label>
          <Input
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword?.message ? (
            <p className={styles.errorAlert}>
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>

        <Button
          className={styles.submitButton}
          disabled={createUser.isPending}
          type='submit'
        >
          {createUser.isPending ? 'Creating...' : 'Create user'}
        </Button>
      </form>
    </Drawer>
  );
}

export default CreateUserDrawer;