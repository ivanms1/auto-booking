import React from 'react';
import { notifications } from '@mantine/notifications';
import styles from './Profile.module.css';
import ImageForm from './ImageForm'
import BasicInformationForm from './BasicInformationForm'
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import { useUploadImage } from '@/services/users';

function Profile() {

  const userMutationUpload = useUploadImage();

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
        <BasicInformationForm />
      </div>
      <ChangeEmail />
      <ChangePassword />
    </div>
  );
}

export default Profile;
