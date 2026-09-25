import { useQuery, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { getPendingBookings, approveBooking, rejectBooking } from './request';
import type { Booking } from '@/models/booking';

export function useGetPendingBookings() {
  return useQuery<Booking[], AxiosError<Error>>(
    { queryKey: ['pendingBookings'], queryFn: getPendingBookings }
  );
}

export function useApproveBooking(
  onSuccess?: (
    data: Booking,
    variables: { id: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<Booking, AxiosError<Error>, { id: string }>({
    mutationFn: ({ id }) => approveBooking(id),
    onSuccess,
    onError,
  });
}

export function useRejectBooking(
  onSuccess?: (
    data: Booking,
    variables: { id: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<Booking, AxiosError<Error>, { id: string }>({
    mutationFn: ({ id }) => rejectBooking(id),
    onSuccess,
    onError,
  });
}
