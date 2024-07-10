import { Drawer } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './BookingDrawer.module.css';
import { useUpdateBooking, useDeleteBooking } from '@/services/bookings';
import Input from '@/components/Input';
import type { Booking } from '@/models/booking';
import Button from '@/components/Button';

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
  const [editOpen, setEditOpen] = useState(false);

  function onDelete(id: string) {
    bookingMutationDelete.mutate(
      { id },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: ['bookings'] });
          toast.success('Successful delete');
        },
        onError: () => {
          toast.error('You cant Delete this booking');
        },
      }
    );
  }

  const onSubmit: SubmitHandler<BookingUpdateSchemaType> = (data) => {
    const id = selectedBooking?.id ? selectedBooking.id : '';

    const newObject = {
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      description: data.description,
    };

    bookingMutationUpdate.mutate(
      { id, data: newObject },
      {
        onSuccess: () => {
          reset();
          void queryClient.invalidateQueries({ queryKey: ['bookings'] });
          toast.success('Successful booking update');
        },
        onError: (error) => {
          const errorMessage = error.response?.data.message
            ? error.response.data.message
            : 'Unnown Error';
          toast.error(errorMessage);
        },
      }
    );
  };

  function onCloseDrawer () {
    onClose();
    setEditOpen(false)
  }

  return (
    <Drawer
      onClose={onCloseDrawer}
      opened={Boolean(selectedBooking)}
      position='right'
      size='50%'
      title='Detalles de la Reserva'
    >
      {selectedBooking ? (
        <div>
          <h1>{selectedBooking.title}</h1>
          <br />
          <p>Start: {startDate.toString()}</p>
          <br />
          <p>End: {endDate.toString()}</p>
          {selectedBooking.description ? (
            <>
              <p>Description:</p>
              <p>{selectedBooking.description}</p>
            </>
          ) : null}
          <br />
          {!editOpen && (
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  onDelete(selectedBooking.id);
                }}
                size='lg'
                variant='danger'
              >
                DELETE BOOKING
              </Button>
              <Button
                onClick={() => {
                  setEditOpen(!editOpen);
                }}
                size='lg'
                variant='info'
              >
                OPEN EDIT BOOKING
              </Button>
            </div>
          )}
          {editOpen ? (
            <div className={styles.mainBox}>
              <div className={styles.headerForm}>
                <Button
                  onClick={() => {
                    setEditOpen(!editOpen);
                  }}
                  variant='warning'
                >
                  CLOSE
                </Button>
                <p className={styles.formTitle}>Booking Edit Form</p>
              </div>
              <div className={styles.mainBox}>
                <div className={styles.line2} />
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                    <p className={styles.errorAlert}>
                      {errors.startDate.message}
                    </p>
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
                    <p className={styles.errorAlert}>
                      {errors.endDate.message}
                    </p>
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
                    <p className={styles.errorAlert}>
                      {errors.description.message}
                    </p>
                  ) : null}
                  <Button
                    className={styles.submitButton}
                    size='lg'
                    type='submit'
                  >
                    Edit Booking
                  </Button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </Drawer>
  );
}

export default BookingDrawer;
