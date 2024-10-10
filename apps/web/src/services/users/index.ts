import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { UserInput} from './request';
import { createUser, deleteUser, updateUser, uploadImage } from './request';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { User } from '@/models/user';

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
    variables: { data: User },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<User, AxiosError<Error>, { data: User }>({
    mutationFn: ({ data }) => updateUser(data),
    onError,
  });
}

export function useUploadImage(
  onSuccess?: (
    data: User,
    variables: { file: File },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<User, AxiosError<Error>, { file: File }>({
    mutationFn: ({ file }) => uploadImage(file),
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
