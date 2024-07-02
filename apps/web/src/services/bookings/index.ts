import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { Booking } from '@/models/booking';
import type { BookingUpdate, BookingInput } from './request';
import { createBooking, deleteBooking, updateBooking  } from './request';

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
    variables: { id: string; data: BookingUpdate },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<Booking, AxiosError<Error>, { id: string; data: BookingUpdate }>({
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
