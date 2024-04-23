import { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import { Car } from '@/models/car';
import { MutateOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createCar, deleteCar, updateCar } from './request';

export function useCreateCar(
  options: MutateOptions<
    Car,
    AxiosError<Error>,
    Car,
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
