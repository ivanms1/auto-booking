import React, { useMemo, useState, useCallback } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styles from './MyBookings.module.css';
import BookingDrawer from '@/pages/BookingsCar/BookingDrawer';
import Button from '@/components/Button';
import CustomTable from '@/components/CustomTable';
import { useDeleteBooking, useGetMyBookings } from '@/services/bookings';
import { bookingQueryKeys } from '@/services/bookings/request';
import { carQueryKeys } from '@/services/cars/request';
import { roomQueryKeys } from '@/services/rooms/request';
import { userQueryKeys } from '@/services/users/request';
import type { Booking } from '@/models/booking';

interface ActionCallbacks {
  onEdit?: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}

const columnHelper = createColumnHelper<Booking>();

const columns = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor(
    (booking) => booking.room?.name ?? booking.car?.model ?? 'Unknown',
    {
      id: 'resource',
      header: () => <span>Room / Car</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }
  ),
  columnHelper.accessor('startDate', {
    header: () => <span>Start Date</span>,
    cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
  }),
  columnHelper.accessor('endDate', {
    header: () => <span>End Date</span>,
    cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];

const createActionColumns = ({ onEdit, onDelete }: ActionCallbacks) => [
  ...columns,
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: (info) => (
      <ActionsCell
        booking={info.row.original}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ),
  }),
];

function MyBookings() {
  const { data: bookings = [], isLoading } = useGetMyBookings();
  const { data: carData } = useQuery({ ...carQueryKeys.list() });
  const { data: roomData } = useQuery({ ...roomQueryKeys.list() });
  const { data: users } = useQuery({ ...userQueryKeys.list() });

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const queryClient = useQueryClient();
  const deleteMutation = useDeleteBooking();

  const myBookings = bookings.filter(
    (booking) => booking.status === 'PENDING' || booking.status === 'REJECTED'
  );

  const invalidateQueries = useCallback(() => {
    void queryClient.invalidateQueries({
      queryKey: bookingQueryKeys.my().queryKey,
    });

    void queryClient.invalidateQueries({
      queryKey: bookingQueryKeys.list().queryKey,
    });
  }, [queryClient]);

  const handleDelete = useCallback(
    (booking: Booking) => {
      deleteMutation.mutate(
        { id: booking.id },
        {
          onSuccess: () => {
            invalidateQueries();

            notifications.show({
              title: 'Success',
              message: 'Booking deleted successfully',
              color: 'green',
            });
          },
          onError: () => {
            notifications.show({
              title: 'Error',
              message: 'Unable to delete this booking',
              color: 'red',
            });
          },
        }
      );
    },
    [deleteMutation, invalidateQueries]
  );
  const bookingColumns = useMemo(
    () =>
      createActionColumns({
        onEdit: (booking) => {
          setSelectedBooking(booking);
        },
        onDelete: handleDelete,
      }),
    [handleDelete]
  );

  const bookingsTable = useReactTable({
    data: myBookings,
    columns: bookingColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.main}>
      <BookingDrawer
        carData={carData}
        onClose={() => {
          setSelectedBooking(null);
        }}
        roomData={roomData}
        selectedBooking={selectedBooking}
        users={users}
      />

      <h1>My Bookings</h1>

      {myBookings.length > 0 ? (
        <CustomTable<Booking> table={bookingsTable} />
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
}

interface ActionsCellProps {
  booking: Booking;
  onEdit?: (booking: Booking) => void;
  onDelete: (booking: Booking) => void;
}

function ActionsCell({ booking, onEdit, onDelete }: ActionsCellProps) {
  return (
    <div className={styles.actions}>
      {onEdit && booking.status === 'PENDING' ? (
        <Button
          onClick={() => {
            onEdit(booking);
          }}
          outline
          variant='info'
        >
          Edit
        </Button>
      ) : null}

      <Button
        onClick={() => {
          onDelete(booking);
        }}
        outline
        variant='danger'
      >
        Delete
      </Button>
    </div>
  );
}

export default MyBookings;
