import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { FileInput } from '@mantine/core';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './Profile.module.css';
import ProfilePicture from '@/assets/svg/27716.svg?react';
import useGetCurrentUser from '@/hooks/useGetCurrentUser';
import Button from '@/components/Button';

interface ImageFormProps {
  onUploadImage: (file: File) => void;
}

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

export type InputImageSchemaType = z.infer<typeof inputImageSchema>;

function ImageForm({ onUploadImage }: ImageFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InputImageSchemaType>({
    resolver: zodResolver(inputImageSchema),
  });

  const { user } = useGetCurrentUser();

  const imageValue = watch('image') as File | undefined;

  const onSubmit: SubmitHandler<InputImageSchemaType> = (data) => {
    onUploadImage(data.image);
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
          {user?.avatar ? (
            <div className={styles.avatarContent}>
            <img
              alt='ProfilePicture'
              className={styles.profilePicture}
              src={user.avatar}
            />
            </div>
          ) : (
            <ProfilePicture className={styles.imageInside} />
          )}
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

export default ImageForm;
