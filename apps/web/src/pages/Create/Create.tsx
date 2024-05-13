import React from 'react';
import styles from './Create.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { carQueryKeys } from '@/services/cars/request';
import { roomQueryKeys } from '@/services/rooms/request';
import { useEffect } from 'react';
import { useCreateBooking } from '@/services/bookings';

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
    bookingType: z.union([z.literal('roomId'), z.literal('carId')]),
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

function CreateBookings() {
  const { data: carData } = useQuery({ ...carQueryKeys.list() });
  const { data: roomData } = useQuery({ ...roomQueryKeys.list() });

  const bookingMutation = useCreateBooking()
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      bookingType: 'roomId',
      bookingValue: roomData?.[0]?.id ?? '',
    },
  });

  console.log(errors);

  const onSubmit: SubmitHandler<BookingSchemaType> = async (data) => {
    const dataToCreate = {
      [data.bookingType]: data.bookingValue,
      authorId: 'clvf2kgvf0000cjxq1pjq3zui',
      title: data.title,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    bookingMutation.mutate(dataToCreate, {
      onSuccess: () => {
           reset()
           console.log('Successful booking creation');     
           // TODO: add notification
      },
      onError: () => {
        console.log('Failure booking creation');
        // TODO: add notification
      }
      });
    reset();
  };

  const currentBookingType = watch('bookingType');

  const options =
    currentBookingType === 'roomId'
      ? roomData?.map((room) => {
          return { value: room.id, label: room.name };
        })
      : carData?.map((car) => {
          return { value: car.id, label: car.model };
        });

  useEffect(() => {
    if (currentBookingType === 'roomId') {
      setValue('bookingValue', roomData && roomData.length > 0 ? roomData[0].id : '');
    } else {
      setValue('bookingValue', carData && carData.length > 0 ? carData[0].id : '')
    }
  }, [currentBookingType]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Create a Booking</h1>
      <div className={styles.line}></div>
      <div className={styles.mainBox}>
        <p className={styles.formTitle}>Booking Form</p>
        <div className={styles.line2}></div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input1}>
            <label className={styles.formP}>Reservation Title</label>
            <Input
              className={styles.inputForm}
              type='text'
              placeholder='Reservation Title (Person, Ministry, Activity)'
              id='title'
              {...register('title')}
            />
          </div>
          {errors.title?.message && (
            <p className={styles.errorAlert}>{errors.title.message}</p>
          )}
          <div className={styles.input1}>
            <label className={styles.formP}>Start date</label>
            <Input
              className={styles.inputForm2}
              type='datetime-local'
              id='startDate'
              {...register('startDate')}
            />
          </div>
          {errors.startDate?.message && (
            <p className={styles.errorAlert}>{errors.startDate.message}</p>
          )}
          <div className={styles.input1}>
            <label className={styles.formP}>End date</label>
            <Input
              className={styles.inputForm2}
              type='datetime-local'
              id='endDate'
              {...register('endDate')}
            />
          </div>
          {errors.endDate?.message && (
            <p className={styles.errorAlert}>{errors.endDate.message}</p>
          )}
          <div className={styles.inputForm3}>
            <p className={styles.pradio}>Services</p>
            <div className={styles.inputRadio}>
              <div className={styles.radios}>
                <Input type='radio' value='roomId' {...register('bookingType')} />
                <label className={styles.labelRadio}>Room</label>
              </div>
              <div>
                <Input type='radio' value='carId' {...register('bookingType')} />
                <label className={styles.labelRadio}>Car</label>
              </div>
              <select className={styles.select} {...register('bookingValue')}>
                {options?.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.bookingType?.message && (
            <p className={styles.errorAlert}>{errors.bookingType?.message}</p>
          )}

          <div className={styles.input1}>
            <label className={styles.formP}>Description</label>
            <Input
              className={styles.inputForm}
              type='text'
              placeholder='Some description about reservation'
              id='description'
              {...register('description')}
            />
          </div>
          {errors.description?.message && (
            <p className={styles.errorAlert}>{errors.description.message}</p>
          )}
          <Button className={styles.submitButton} type='submit'>
            Submit
          </Button>
        </form>
        {JSON.stringify(watch(), null, 2)}
      </div>
    </div>
  );
}

export default CreateBookings;
