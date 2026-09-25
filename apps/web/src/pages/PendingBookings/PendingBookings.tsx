import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import styles from './PendingBookings.module.css';
import {
  useGetPendingBookings,
  useApproveBooking,
  useRejectBooking,
} from '@/services/pendingBookings';
import CustomTable from '@/components/CustomTable';
import Button from '@/components/Button';
import type { Booking } from '@/models/booking';

const columnHelper = createColumnHelper<Booking>();

const columns = [
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
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

  const handleApprove = () => {
    approveMutation.mutate(
      { id: booking.id },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: ['pendingBookings'] });
          void queryClient.invalidateQueries({ queryKey: ['bookings'] });
          notifications.show({
            title: 'Success',
            message: 'Booking approved successfully',
            color: 'green',
          });
        },
        onError: (error) => {
          const errorMessage = error.response?.data.message
            ? error.response.data.message
            : 'Unknown Error';

          notifications.show({
            title: 'Error',
            message: errorMessage,
            color: 'red',
          });
        },
      }
    );
  };

  const handleReject = () => {
    rejectMutation.mutate(
      { id: booking.id },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: ['pendingBookings'] });
          void queryClient.invalidateQueries({ queryKey: ['bookings'] });
          notifications.show({
            title: 'Success',
            message: 'Booking rejected successfully',
            color: 'blue',
          });
        },
        onError: (error) => {
          const errorMessage = error.response?.data.message
            ? error.response.data.message
            : 'Unknown Error';

          notifications.show({
            title: 'Error',
            message: errorMessage,
            color: 'red',
          });
        },
      }
    );
  };

  return (
    <div className={styles.actions}>
      <Button onClick={handleApprove} variant='success'>
        Approve
      </Button>
      <Button onClick={handleReject} variant='danger'>
        Reject
      </Button>
    </div>
  );
}
