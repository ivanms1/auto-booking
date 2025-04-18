import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Drawer } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import styles from './DrawerCreate.module.css';
import type { Room } from '@/models/room';
import { useCreateBooking } from '@/services/bookings';
import Button from '@/components/Button';
import Input from '@/components/Input';
import type { Car } from '@/models/car';

const bookingSchema = z
  .object({
    title: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(5, { message: 'Title must be 5 or more characters long' })
      .refine(
        (value) => {
          const letterCount = (value.match(/[a-zA-Z]/g) || []).length;
          return letterCount >= 5;
        },
        {
          message: 'Title must contain at least 5 letters',
        }
      ),
    startDate: z
      .string()
      .refine((value) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value), {
        message: 'The date and time must be in the format YYYY-MM-DDTHH:MM',
      })
      .refine(
        (value) => {
          const selectedDate = new Date(value);
          const currentDate = new Date();
          return selectedDate >= currentDate;
        },
        {
          message:
            'The date and time cannot be earlier than the current datetime',
        }
      ),
    endDate: z
      .string()
      .refine((value) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value), {
        message: 'The date and time must be in the format YYYY-MM-DDTHH:MM',
      }),
    bookingValue: z.string(),
    description: z.string(),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      return endDate >= startDate;
    },
    {
      message: 'The end date cannot be earlier than the start date',
      path: ['endDate'],
    }
  );

export type BookingSchemaType = z.infer<typeof bookingSchema>;

function DrawerCreate({
  opened,
  onClose,
  roomData,
}: {
  opened: boolean;
  onClose: () => void;
  carData: Car[] | undefined;
  roomData: Room[] | undefined;
}) {
  const bookingMutation = useCreateBooking();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
  });
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<BookingSchemaType> = (data) => {
    const dataToCreate = {
      roomId: data.bookingValue,
      title: data.title,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      description: data.description,
    };

    bookingMutation.mutate(dataToCreate, {
      onSuccess: () => {
        reset();
        void queryClient.invalidateQueries({ queryKey: ['bookings'] });
        notifications.show({
          title: 'Success',
          message: 'Successful booking creation',
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
    });
  };


  return (
    <Drawer onClose={onClose} opened={opened} position='right' size='60%'>
      <div className={styles.main}>
        <h1 className={styles.title}>Create Booking</h1>
        <div className={styles.line} />
        <div className={styles.mainBox}>
          <p className={styles.formTitle}>Room Booking Form</p>
          <div className={styles.line2} />
          <form
            className={styles.form}
            onSubmit={(event) => void handleSubmit(onSubmit)(event)}
          >
            <div className={styles.input1}>
              <label className={styles.formP} htmlFor='title'>
                Reservation Title
              </label>
              <Input
                className={styles.inputForm}
                id='title'
                placeholder='Reservation Title (Person, Ministry, Activity)'
                type='text'
                {...register('title')}
              />
            </div>
            {errors.title?.message ? (
              <p className={styles.errorAlert}>{errors.title.message}</p>
            ) : null}
            <div className={styles.input1}>
              <label className={styles.formP} htmlFor='startDate'>
                Start date
              </label>
              <Input
                className={styles.inputForm2}
                id='startDate'
                type='datetime-local'
                {...register('startDate')}
              />
            </div>
            {errors.startDate?.message ? (
              <p className={styles.errorAlert}>{errors.startDate.message}</p>
            ) : null}
            <div className={styles.input1}>
              <label className={styles.formP} htmlFor='endDate'>
                End date
              </label>
              <Input
                className={styles.inputForm2}
                id='endDate'
                type='datetime-local'
                {...register('endDate')}
              />
            </div>
            {errors.endDate?.message ? (
              <p className={styles.errorAlert}>{errors.endDate.message}</p>
            ) : null}
            <div className={styles.inputForm3}>
              <p className={styles.pradio}>Select Room</p>
              <div className={styles.inputRadio}>
                <select className={styles.select} {...register('bookingValue')}>
                  {roomData?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.bookingValue?.message ? (
              <p className={styles.errorAlert}>{errors.bookingValue.message}</p>
            ) : null}

            <div className={styles.input1}>
              <label className={styles.formP} htmlFor='description'>
                Description
              </label>
              <Input
                className={styles.inputForm}
                id='description'
                placeholder='Some description about reservation'
                type='text'
                {...register('description')}
              />
            </div>
            {errors.description?.message ? (
              <p className={styles.errorAlert}>{errors.description.message}</p>
            ) : null}
            <Button className={styles.submitButton} type='submit'>
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Drawer>
  );
}

export default DrawerCreate;

