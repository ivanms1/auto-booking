import React from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import styles from './Profile.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useUpdateEmail } from '@/services/users';

const changeEmailSchema = z
  .object({
    email: z.string().min(6, { message: "This field has to be filled." }).email(),
  })

export type EmailSchemaType = z.infer<typeof changeEmailSchema>;

function ChangeEmail() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchemaType>({
    resolver: zodResolver(changeEmailSchema),
  });
  
  const userMutationUpdate = useUpdateEmail();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<EmailSchemaType> = (data) => {

    userMutationUpdate.mutate(
      { data },
      {
        onSuccess: () => {
          reset();
          void queryClient.invalidateQueries({ queryKey: ['users'] });
          notifications.show({
            title: 'Success',
            message: 'Successful update',
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

  return (<div className={styles.mainBox}>
    <form
      className={styles.form}
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
    <p className={styles.formTitle}>Email</p>
    <p className={styles.subtitle}>Your current primary email adress is </p>
    <div className={styles.line2} />
    <div className={styles.input1}>
      <label className={styles.formP} htmlFor='description'>
        New email address
      </label>
      <Input
        className={styles.inputForm}
        id='newemail'
        placeholder='Enter your email address'
        type='string'
        {...register('email')}
      />
    </div>
    {errors.email?.message ? (
        <p className={styles.errorAlert}>{errors.email.message}</p>
      ) : null}
    <Button className={styles.submitButton} size='lg' type='submit'>
      Save Changes
    </Button>
    </form>
  </div>)
}

export default ChangeEmail