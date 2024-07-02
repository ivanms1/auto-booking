import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { Car } from '@/models/car';
import type { CarInput} from './request';
import { createCar, deleteCar, updateCar } from './request';

export function useCreateCar(
  options: MutateOptions<
    Car,
    AxiosError<Error>,
    CarInput,
    DefaultQueryKeyWithoutData
  > = {}
) {
  return useMutation({
    mutationFn: createCar,
    ...options,
  });
}

export function useUpdateCar(
  onSuccess?: (
    data: Car,
    variables: { id: string; data: Car },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<Car, AxiosError<Error>, { id: string; data: Car }>({
    mutationFn: ({ id, data }) => updateCar(id, data),
    onError,
  });
}

export const useDeleteCar = (
  onSuccess?: (
    data: boolean,
    variables: { id: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void,
) => {
  return useMutation<string, AxiosError<Error>, { id: string }>({
    mutationFn: ({ id }) => deleteCar(id),
    onError,
  });
};
