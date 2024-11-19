import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { UserInput} from './request';
import { createUser, deleteUser, updateUser, updateUserEmail, updateUserPassword, uploadImage } from './request';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { User } from '@/models/user';
import type { UpdateSchemaType } from '@/pages/Profile/BasicInformationForm';
import type { EmailSchemaType } from '@/pages/Profile/ChangeEmail';
import type { PasswordSchemaType } from '@/pages/Profile/ChangePassword';

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
    data: UpdateSchemaType,
    variables: { data: UpdateSchemaType },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<User, AxiosError<Error>, { data: UpdateSchemaType }>({
    mutationFn: ({ data }) => updateUser(data),
    onError,
  });
}

export function useUpdateEmail(
  onSuccess?: (
    data: EmailSchemaType,
    variables: { data: EmailSchemaType },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<User, AxiosError<Error>, { data: EmailSchemaType }>({
    mutationFn: ({ data }) => updateUserEmail(data),
    onError,
  });
}

export function useUpdatePassword(
  onSuccess?: (
    data: PasswordSchemaType,
    variables: { data: PasswordSchemaType },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<User, AxiosError<Error>, { data: PasswordSchemaType }>({
    mutationFn: ({ data }) => updateUserPassword(data),
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
