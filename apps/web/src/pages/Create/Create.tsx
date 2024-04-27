import React from 'react';
import styles from './Create.module.css';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

//import { useQueries, useQuery } from '@tanstack/react-query';
import { createBooking} from '@/services/bookings/request';

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
    roomcar: z.string(),
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingSchemaType>({
    resolver: zodResolver(bookingSchema),
  });


const onSubmit: SubmitHandler<BookingSchemaType> = async data => {
  console.log(data);
  const dataToCreate = {
    authorId: 'clvf2kgvf0000cjxq1pjq3zui',
    title: data.title,
    startDate: new Date(data.startDate),
    endDate: new Date (data.endDate)
  }
    const createdBooking = await createBooking(dataToCreate)
    console.log(createdBooking);
    reset()
}


  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Create a Booking</h1>
      <div className={styles.line}></div>
      <div className={styles.mainBox}>
        <p className={styles.formTitle}>Booking Form</p>
        <div className={styles.line2}></div>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
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
          {errors.title?.message && <p className={styles.errorAlert}>{errors.title.message}</p>}
          <div className={styles.input1}>
            <label className={styles.formP}>Start date</label>
            <Input
              className={styles.inputForm2}
              type='datetime-local'
              id='startDate'
              {...register('startDate')}
            />
          </div>
          {errors.startDate?.message && <p className={styles.errorAlert}>{errors.startDate.message}</p>}
          <div className={styles.input1}>
            <label className={styles.formP}>End date</label>
            <Input
              className={styles.inputForm2}
              type='datetime-local'
              id='endDate'
              {...register('endDate')}
            />
          </div>
          {errors.endDate?.message && <p className={styles.errorAlert}>{errors.endDate.message}</p>}
          <div className={styles.input1}>
            <label className={styles.formP}>Add Room or Car</label>
            <Input
              className={styles.inputForm}
              type='text'
              placeholder='Room or Car'
              id='roomcar'
              {...register('roomcar')}
            />
          </div>
          {errors.roomcar?.message && <p className={styles.errorAlert}>{errors.roomcar.message}</p>}
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
          {errors.description?.message && <p className={styles.errorAlert}>{errors.description.message}</p>}
          <Button className={styles.submitButton} type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateBookings;
