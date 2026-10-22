import { useQuery, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import {
  approveBooking,
  pendingBookingQueryKeys,
  rejectBooking,
} from './request';
import type { Booking } from '@/models/booking';

export function useGetPendingBookings() {
  return useQuery({
    ...pendingBookingQueryKeys.list(),
    staleTime: 0,
  });
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
