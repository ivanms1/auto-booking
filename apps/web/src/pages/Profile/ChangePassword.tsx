import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { QUERY_KEYS } from '@/services/queryKeys';
import styles from './Profile.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useUpdatePassword } from '@/services/users';

const changePasswordSchema = z.object({
  password: z.string().min(6, { message: 'Please enter a valid password' }),
  newPassword: z.string().min(6, { message: 'Please enter a valid password' }),
  duplicatePassword: z
    .string()
    .min(6, { message: 'Please enter a valid password' }),
});

export type PasswordSchemaType = z.infer<typeof changePasswordSchema>;

function ChangePassword() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const userMutationUpdate = useUpdatePassword();
  const queryClient = useQueryClient();


const onSubmit: SubmitHandler<PasswordSchemaType> = (data) => {

  userMutationUpdate.mutate(
    { data },
    {
      onSuccess: () => {
        reset();
        void queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
        notifications.show({
          title: 'Success',
          message: 'Successful update Password',
          color: 'green',
        });
      },
      onError: (error) => {
        const errorMessage = error.response?.data.message
          ? error.response.data.message
          : 'Unnown Error';
        notifications.show({
          title: 'Error',
          message: errorMessage ? errorMessage : 'Error',
          color: 'red',
        });
      },
    }
  );
};

  return (
    <div className={styles.mainBox}>
      <form
        className={styles.form}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      >
        <p className={styles.formTitle}>Change your Password</p>
        <p className={styles.subtitle}>Your current primary email adress is </p>
        <div className={styles.line2} />
        <div className={styles.input1}>
          <label className={styles.formP} htmlFor='description'>
            Current Password
          </label>
          <Input
            className={styles.inputForm}
            id='currentpassword'
            placeholder='Enter Current password'
            type='string'
            {...register('password')}
          />
        </div>
        {errors.password?.message ? (
        <p className={styles.errorAlert}>{errors.password.message}</p>
      ) : null}
        <div className={styles.input1}>
          <label className={styles.formP} htmlFor='description'>
            New password
          </label>
          <Input
            className={styles.inputForm}
            id='newpassword'
            placeholder='Enter new password'
            type='string'
            {...register('newPassword')}
          />
        </div>
        {errors.newPassword?.message ? (
        <p className={styles.errorAlert}>{errors.newPassword.message}</p>
      ) : null}
        <div className={styles.input1}>
          <label className={styles.formP} htmlFor='description'>
            Confirm new password
          </label>
          <Input
            className={styles.inputForm}
            id='duplicatePassword'
            placeholder='Confirm new password'
            type='string'
            {...register('duplicatePassword')}
          />
        </div>
        {errors.duplicatePassword?.message ? (
        <p className={styles.errorAlert}>{errors.duplicatePassword.message}</p>
      ) : null}
        <Button className={styles.submitButton} size='lg' type='submit'>
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default ChangePassword;
