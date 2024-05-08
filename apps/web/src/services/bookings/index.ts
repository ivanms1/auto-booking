import { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import { Booking } from '@/models/booking';
import { MutateOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createBooking, deleteBooking, updateBooking } from './request';
import { BookingInput } from './request';

export function useCreateBooking(
  options: MutateOptions<
    Booking,
    AxiosError<Error>,
    BookingInput,
    DefaultQueryKeyWithoutData
  > = {}
) {
  return useMutation({
    mutationFn: createBooking,
    ...options,
  });
}

export function useUpdateBooking(
  onSuccess?: (
    data: Booking,
    variables: { id: string; data: Booking },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<Booking, AxiosError<Error>, { id: string; data: Booking }>({
    mutationFn: ({ id, data }) => updateBooking(id, data),
    onError,
  });
}

export const useDeleteBooking = (
  onSuccess?: (
    data: boolean,
    variables: { id: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void,
) => {
  return useMutation<string, AxiosError<Error>, { id: string }>({
    mutationFn: ({ id }) => deleteBooking(id),
    onError,
  });
};
