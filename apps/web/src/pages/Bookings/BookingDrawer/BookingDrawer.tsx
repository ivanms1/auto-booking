import Button from '@/components/Button';
import { Booking } from '@/models/booking';
import { useDeleteBooking } from '@/services/bookings';
import { Drawer } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './BookingDrawer.module.css';
import Input from '@/components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateBooking } from '@/services/bookings';
import { z } from 'zod';

const editBookingSchema = z
  .object({
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

type BookingUpdateSchemaType = z.infer<typeof editBookingSchema>;

function BookingDrawer({
  selectedBooking,
  onClose,
}: {
  selectedBooking: Booking | null;
  onClose: () => void;
}) {
  const startDate = new Date(
    selectedBooking?.startDate ? selectedBooking.startDate : ''
  );
  const endDate = new Date(
    selectedBooking?.endDate ? selectedBooking.endDate : ''
  );
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingUpdateSchemaType>({
    resolver: zodResolver(editBookingSchema),
    defaultValues: {
      startDate: selectedBooking?.startDate.toString(),
      endDate: selectedBooking?.endDate.toString(),
      description: selectedBooking?.description,
    },
  });
  const bookingMutationDelete = useDeleteBooking();
  const bookingMutationUpdate = useUpdateBooking();
  const queryClient = useQueryClient();
  const [editOpen, useEditOpen] = useState(false);

  function onDelete(id: string) {
    bookingMutationDelete.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
          toast.success('Successful delete');
        },
        onError: (error) => {
          console.log(error);
          toast.error('You cant Delete this booking');
        },
      }
    );
  }

  const onSubmit: SubmitHandler<BookingUpdateSchemaType> = async (data) => {
    const id = selectedBooking?.id ? selectedBooking.id : '';

    const newObject = {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      description: data?.description,
    };

    bookingMutationUpdate.mutate(
      { id, data: newObject },
      {
        onSuccess: () => {
          reset();
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
          toast.success('Successful booking update');
        },
        onError: (error) => {
          const errorMessage = error.response?.data.message
            ? error.response?.data.message
            : 'Unnown Error';
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <Drawer
      opened={!!selectedBooking}
      onClose={onClose}
      title='Detalles de la Reserva'
      position='right'
      size='50%'
    >
      {selectedBooking && (
        <div>
          <h1>{selectedBooking.title}</h1>
          <br />
          <p>Start: {startDate.toString()}</p>
          <br />
          <p>End: {endDate.toString()}</p>
          {selectedBooking.description && (
            <>
              <p>Description:</p>
              <p>{selectedBooking.description}</p>
            </>
          )}
          <br />
          {!editOpen && (
            <div className={styles.buttons}>
              <Button
                variant='danger'
                size='lg'
                onClick={() => onDelete(selectedBooking.id)}
              >
                DELETE BOOKING
              </Button>
              <Button
                size='lg'
                variant='info'
                onClick={() => useEditOpen(!editOpen)}
              >
                OPEN EDIT BOOKING
              </Button>
            </div>
          )}
          {editOpen && (
            <div className={styles.mainBox}>
              <div className={styles.headerForm}>
                <Button
                  variant='warning'
                  onClick={() => useEditOpen(!editOpen)}
                >
                  CLOSE
                </Button>
                <p className={styles.formTitle}>Booking Edit Form</p>
              </div>
              <div className={styles.mainBox}>
                <div className={styles.line2}></div>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <p className={styles.errorAlert}>
                      {errors.startDate.message}
                    </p>
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
                    <p className={styles.errorAlert}>
                      {errors.endDate.message}
                    </p>
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
                    <p className={styles.errorAlert}>
                      {errors.description.message}
                    </p>
                  )}
                  <Button
                    className={styles.submitButton}
                    type='submit'
                    size='lg'
                  >
                    Edit Booking
                  </Button>
                </form>
                {JSON.stringify(watch(), null, 2)}
              </div>
            </div>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default BookingDrawer;
