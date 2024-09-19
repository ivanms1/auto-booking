import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileInput } from '@mantine/core';
import styles from './Profile.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProfilePicture from '@/assets/svg/profile.svg?react';

const generalSettingsSchema = z.object({
  avatar: z.instanceof(FileList),
  name: z.string(),
  email: z.string().email(),
  country: z.string(),
  address1: z.string(),
  address2: z.string(),
  zip: z.number(),
});

export type BookingSchemaType = z.infer<typeof generalSettingsSchema>;

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(generalSettingsSchema),
  });

  const onSubmit: SubmitHandler<BookingSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Account</h1>
      <div className={styles.line} />
      <div className={styles.mainBox}>
        <p className={styles.formTitle}>General Settings</p>
        <p className={styles.subtitle}>Your current primary email adress is </p>
        <div className={styles.line2} />
        <form
          className={styles.form}
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <div className={styles.inputAvatarSection}>
            <label className={styles.formP} htmlFor='title'>
              Avatar
            </label>
            <div className={styles.avatarOptions}>
              <ProfilePicture className={styles.imageInside} />
              <Controller
                control={control}
                name='avatar'
                render={({ field: { onChange } }) => (
                  <FileInput
                    accept='image/png,image/jpeg'
                    className={styles.file}
                    onChange={onChange}
                    placeholder='Change'
                  />
                )}
              />

              <Button className={styles.file} outline variant='danger'>
                Remove
              </Button>
            </div>
          </div>
          {errors.avatar?.message ? (
            <p className={styles.errorAlert}>{errors.avatar.message}</p>
          ) : null}
          <p className={styles.formTitle}>Basic Information</p>
          <p className={styles.subtitle}>
            Update some personal information. Your adress will never be publicly
            available
          </p>
          <div className={styles.line2} />
          <div className={styles.input1}>
            <label className={styles.formP} htmlFor='name'>
              Name
            </label>
            <Input
              className={styles.inputForm2}
              id='name'
              placeholder='Name'
              type='string'
              {...register('name')}
            />
          </div>
          {errors.name?.message ? (
            <p className={styles.errorAlert}>{errors.name.message}</p>
          ) : null}
          <div className={styles.input1}>
            <label className={styles.formP} htmlFor='email'>
              Email
            </label>
            <Input
              className={styles.inputForm2}
              id='email'
              type='email'
              {...register('email')}
              placeholder='E-mail'
            />
          </div>
          {errors.email?.message ? (
            <p className={styles.errorAlert}>{errors.email.message}</p>
          ) : null}
          <div className={styles.inputForm3}>
            <p className={styles.pradio}>Location</p>
            <div className={styles.inputs}>
              <Input
                className={styles.inputForm4}
                id='country'
                type='country'
                {...register('country')}
                placeholder='Select Country'
              />
            </div>
          </div>
          {errors.country?.message ? (
            <p className={styles.errorAlert}>{errors.country.message}</p>
          ) : null}

          <div className={styles.input1}>
            <label className={styles.formP} htmlFor='description'>
              Address 1
            </label>
            <Input
              className={styles.inputForm}
              id='address1'
              placeholder='Address 1'
              type='text'
              {...register('address1')}
            />
          </div>
          {errors.address1?.message ? (
            <p className={styles.errorAlert}>{errors.address1.message}</p>
          ) : null}
          <div className={styles.input1}>
            <label className={styles.formP} htmlFor='description'>
              Address 2 (optional)
            </label>
            <Input
              className={styles.inputForm}
              id='address2'
              placeholder='Address 2'
              type='text'
              {...register('address2')}
            />
          </div>
          {errors.address2?.message ? (
            <p className={styles.errorAlert}>{errors.address2.message}</p>
          ) : null}
          <div className={styles.input1}>
            <label className={styles.formP} htmlFor='description'>
              Zip Code
            </label>
            <Input
              className={styles.inputForm}
              id='zip'
              placeholder='Zip Number'
              type='number'
              {...register('zip')}
            />
          </div>
          {errors.zip?.message ? (
            <p className={styles.errorAlert}>{errors.zip.message}</p>
          ) : null}
          <Button className={styles.submitButton} size='lg' type='submit'>
            Save Changes
          </Button>
        </form>
      </div>
      <div className={styles.mainBox}>
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
          />
        </div>
        <Button className={styles.submitButton} size='lg'>
          Save Changes
        </Button>
      </div>
      <div className={styles.mainBox}>
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
          />
        </div>
        <div className={styles.input1}>
          <label className={styles.formP} htmlFor='description'>
            New password
          </label>
          <Input
            className={styles.inputForm}
            id='newpassword'
            placeholder='Enter new password'
            type='string'
          />
        </div>
        <div className={styles.input1}>
          <label className={styles.formP} htmlFor='description'>
            Confirm new password
          </label>
          <Input
            className={styles.inputForm}
            id='newpassword2'
            placeholder='Confirm new password'
            type='string'
          />
        </div>
        <Button className={styles.submitButton} size='lg'>
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default Profile;
