import { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import { User } from '@/models/user';
import { MutateOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserInput, createUser, deleteUser, updateUser } from './request';

export function useCreateUser(
  options: MutateOptions<
    User,
    AxiosError<Error>,
    UserInput,
    DefaultQueryKeyWithoutData
  > = {}
) {
  return useMutation({
    mutationFn: createUser,
    ...options,
  });
}

export function useUpdateUser(
  onSuccess?: (
    data: User,
    variables: { id: string; data: User },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<User, AxiosError<Error>, { id: string; data: User }>({
    mutationFn: ({ id, data }) => updateUser(id, data),
    onError,
  });
}

export const useDeleteUser = (
  onSuccess?: (
    data: boolean,
    variables: { id: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void,
) => {
  return useMutation<string, AxiosError<Error>, { id: string }>({
    mutationFn: ({ id }) => deleteUser(id),
    onError,
  });
};
