import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import styles from './Profile.module.css';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProfilePicture from '@/assets/svg/profile.svg?react';
import { useUploadImage } from '@/services/users';

const generalSettingsSchema = z.object({
  name: z.string(),
  country: z.string(),
  address1: z.string(),
  address2: z.string(),
  zip: z.number(),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const inputImageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
});

export type BookingSchemaType = z.infer<typeof generalSettingsSchema>;
export type InputImageSchemaType = z.infer<typeof inputImageSchema>;

interface ImageFormProps {
  onUploadImage: (file: File) => void;
}

function ImageForm({ onUploadImage }: ImageFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputImageSchemaType>({
    resolver: zodResolver(inputImageSchema),
  });

  const imageValue = watch('image') as File | undefined;

  const onSubmit: SubmitHandler<InputImageSchemaType> = (data) => {
    onUploadImage(data.image)
  };

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <p className={styles.formTitle}>General Settings</p>
      <p className={styles.subtitle}>Your current primary email adress is </p>
      <div className={styles.line2} />
      <div className={styles.inputAvatarSection}>
        <label className={styles.formP} htmlFor='title'>
          Avatar
        </label>
        <div className={styles.avatarOptions}>
          <ProfilePicture className={styles.imageInside} />
          <Controller
            control={control}
            name='image'
            render={({ field: { onChange } }) => (
              <FileInput
                accept='image/png,image/jpeg'
                className={styles.file}
                onChange={(file) => {
                  onChange(file);
                }}
                placeholder='Change'
              />
            )}
          />
          {imageValue ? (
            <Button className={styles.submitButtonImage} type='submit'>
              Submit
            </Button>
          ) : null}
          <Button className={styles.file} outline variant='danger'>
            Remove
          </Button>
        </div>
        {errors.image?.message && typeof errors.image.message === 'string' ? (
          <p className={styles.errorAlertImage}>{errors.image.message}</p>
        ) : null}
      </div>
    </form>
  );
}

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(generalSettingsSchema),
  });

  const userMutationUpload = useUploadImage();

  const onSubmit: SubmitHandler<BookingSchemaType> = (data) => {
    console.log(data);
  };

  function onUploadImage(file: File) {

    userMutationUpload.mutate(
      { file },
      {
        onSuccess: () => {
          notifications.show({
            title: 'Success',
            message: 'Successful Upload Image',
            color: 'green',
          });
        },
        onError: () => {
          notifications.show({
            title: 'Error',
            message: 'Fail Uploading Image',
            color: 'red',
          });
        },
      }
    );
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Account</h1>
      <div className={styles.line} />
      <div className={styles.mainBox}>
        <ImageForm onUploadImage={onUploadImage} />
        <form
          className={styles.form}
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
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
            id='duplicatePassword'
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
