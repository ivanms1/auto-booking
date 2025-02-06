import { Drawer } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import styles from './BookingDrawer.module.css';
import { useUpdateBooking, useDeleteBooking } from '@/services/bookings';
import Input from '@/components/Input';
import type { Booking } from '@/models/booking';
import Button from '@/components/Button';
import { dateFormatter } from '@/utils/dateFormatter';
import type { Car } from '@/models/car';
import type { Room } from '@/models/room';

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
  carData,
  roomData
}: {
  selectedBooking: Booking | null;
  onClose: () => void;
  carData: Car[] | undefined;
    roomData: Room[] | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingUpdateSchemaType>({
    resolver: zodResolver(editBookingSchema),
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
          notifications.show({
            title: 'Success',
            message: 'Successful delete',
            color: 'green',
          });
        },
        onError: () => {
          notifications.show({
            title: 'Error',
            message: 'You cant Delete this booking',
            color: 'red',
          });
        },
      }
    );
  }

  useEffect(() => {
    if (selectedBooking) {
      reset({
        startDate: dayjs(selectedBooking.startDate).format('YYYY-MM-DDTHH:mm'),
        endDate: dayjs(selectedBooking.endDate).format('YYYY-MM-DDTHH:mm'),
        description: selectedBooking.description,
      });
    }
  }, [reset, selectedBooking]);

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
          notifications.show({
            title: 'Success',
            message: 'Successful booking update',
            color: 'green',
          });
        },
        onError: (error) => {
          const errorMessage = error.response?.data.message
            ? error.response.data.message
            : 'Unnown Error';
          notifications.show({
            title: 'Error',
            message: errorMessage,
            color: 'red',
          });
        },
      }
    );
  };

  function onCloseDrawer() {
    onClose();
    setEditOpen(false);
  }

  const option = selectedBooking?.roomId
  ? roomData?.find((room) => room.id === selectedBooking.roomId)?.name
  : carData?.find((car) => car.id === selectedBooking?.carId)?.model;

  if (!selectedBooking) {
    return null;
  }
  

  return (
    <Drawer
      onClose={onCloseDrawer}
      opened={Boolean(selectedBooking)}
      position='right'
      size='50%'
    >
      <div>
        {!editOpen ? (
          <div>
            <h1>Detalles de la Reserva</h1>
            <h3 className={styles.titledetails}>{selectedBooking.title}</h3>
            <p className={styles.p}><strong>Car:</strong>{option}</p>
            <p className={styles.p}>
              <strong>Start:</strong>
              {dateFormatter({
                date: selectedBooking.startDate,
              })}
            </p>
            <p className={styles.p}>
              <strong>End:</strong>
              {dateFormatter({
                date: selectedBooking.endDate,
              })}
            </p>
            <p className={styles.p}><strong>Description:</strong> {selectedBooking.description}</p>
            <div className={styles.buttons}>
              <Button
                onClick={() => {
                  onDelete(selectedBooking.id);
                }}
                outline
                size='lg'
                variant='danger'
              >
                Delete Booking
              </Button>
              <Button
                onClick={() => {
                  setEditOpen(!editOpen);
                }}
                outline
                size='lg'
                variant='info'
              >
                Edit Booking
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.mainBox}>
            <div className={styles.headerForm}>
              <p className={styles.formTitle}>Booking Edit Form</p>
              <Button
                onClick={() => {
                  setEditOpen(!editOpen);
                }}
                outline
                variant='warning'
              >
                Return
              </Button>
            </div>
            <div className={styles.mainBox}>
              <div className={styles.line2} />
              <form
                className={styles.form}
                onSubmit={(event) => void handleSubmit(onSubmit)(event)}
              >
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
                {Boolean(errors.endDate?.message) && (
                  <p className={styles.errorAlert}>{errors.endDate?.message}</p>
                )}
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
                {Boolean(errors.description?.message) && (
                  <p className={styles.errorAlert}>
                    {errors.description?.message}
                  </p>
                )}
                <Button className={styles.submitButton} size='lg' type='submit'>
                  Edit Booking
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}

export default BookingDrawer;
