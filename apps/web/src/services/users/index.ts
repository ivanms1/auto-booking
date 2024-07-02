import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { User } from '@/models/user';
import type { UserInput} from './request';
import { createUser, deleteUser, updateUser } from './request';

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
