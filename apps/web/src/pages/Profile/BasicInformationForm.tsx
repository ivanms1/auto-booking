import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import styles from './Profile.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import countriesData from '@/assets/json/countries.json';
import { useUpdateUser } from '@/services/users';

const generalSettingsSchema = z
  .object({
    name: z.string(),
    location: z.string(),
    address1: z.string(),
    address2: z.string(),
    zipCode: z.string().transform((val) => Number(val)),
  })
  .refine((data) => !isNaN(data.zipCode), {
    message: 'Zip must be a number',
    path: ['zip'],
  });

export type UpdateSchemaType = z.infer<typeof generalSettingsSchema>;
const sortedCountries = countriesData.sort((a, b) =>
  a.name.common.localeCompare(b.name.common)
);

function BasicInformationForm() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSchemaType>({
    resolver: zodResolver(generalSettingsSchema),
  });

  const userMutationUpdate = useUpdateUser();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<UpdateSchemaType> = (data) => {

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
  return (
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
          <select
            className={styles.inputForm4}
            id='location'
            {...register('location')}
          >
            <option disabled>Select Country</option>
            {sortedCountries.map((country) => (
              <option key={country.name.official} value={country.name.common}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errors.location?.message ? (
        <p className={styles.errorAlert}>{errors.location.message}</p>
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
          {...register('zipCode')}
        />
      </div>
      {errors.zipCode?.message ? (
        <p className={styles.errorAlert}>{errors.zipCode.message}</p>
      ) : null}
      <Button className={styles.submitButton} size='lg' type='submit'>
        Save Changes
      </Button>
    </form>
  );
}

export default BasicInformationForm;
