import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import type { AxiosError } from 'axios';
import styles from './PendingBookings.module.css';
import {
  useGetPendingBookings,
  useApproveBooking,
  useRejectBooking,
} from '@/services/pendingBookings';
import CustomTable from '@/components/CustomTable';
import Button from '@/components/Button';
import type { Booking } from '@/models/booking';
import { pendingBookingQueryKeys } from '@/services/pendingBookings/request';
import { bookingQueryKeys } from '@/services/bookings/request';

const columnHelper = createColumnHelper<Booking>();

const columns = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor((booking) => booking.author?.name ?? 'Unknown', {
    id: 'author',
    header: () => <span>Author</span>,
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
  columnHelper.display({
    id: 'actions',
    header: () => <span>Actions</span>,
    cell: (info) => <ActionsCell booking={info.row.original} />,
  }),
];

function PendingBookings() {
  const { data: pendingBookings, isLoading } = useGetPendingBookings();
  const navigate = useNavigate();

  const table = useReactTable({
    data: pendingBookings ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.main}>
      <h1>
        Pending Bookings
        <Button
          onClick={() => {
            navigate('/');
          }}
          outline
        >
          Back to Dashboard
        </Button>
      </h1>
      <CustomTable<Booking> table={table} />
    </div>
  );
}

export default PendingBookings;

function ActionsCell({ booking }: { booking: Booking }) {
  const queryClient = useQueryClient();
  const approveMutation = useApproveBooking();
  const rejectMutation = useRejectBooking();
  const isActionPending = approveMutation.isPending || rejectMutation.isPending;

  const handleMutationError = (error: AxiosError<Error>) => {
    notifications.show({
      title: 'Error',
      message: error.response?.data.message ?? 'Unknown Error',
      color: 'red',
    });
  };

  const handleApprove = () => {
    approveMutation.mutate(
      { id: booking.id },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: pendingBookingQueryKeys.list().queryKey,
          });
          void queryClient.invalidateQueries({
            queryKey: bookingQueryKeys._def,
          });
          notifications.show({
            title: 'Success',
            message: 'Booking approved successfully',
            color: 'green',
          });
        },
        onError: handleMutationError,
      }
    );
  };

  const handleReject = () => {
    rejectMutation.mutate(
      { id: booking.id },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: pendingBookingQueryKeys.list().queryKey,
          });
          void queryClient.invalidateQueries({
            queryKey: bookingQueryKeys._def,
          });
          notifications.show({
            title: 'Success',
            message: 'Booking rejected successfully',
            color: 'blue',
          });
        },
        onError: handleMutationError,
      }
    );
  };

  return (
    <div className={styles.actions}>
      <Button
        disabled={isActionPending}
        onClick={handleApprove}
        variant='success'
      >
        Approve
      </Button>
      <Button disabled={isActionPending} onClick={handleReject} variant='danger'>
        Reject
      </Button>
    </div>
  );
}
