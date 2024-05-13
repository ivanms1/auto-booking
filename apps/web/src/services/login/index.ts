import { MutateOptions, useMutation } from '@tanstack/react-query';
import { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import { LoginInput, LoginResponse, login } from './request';
import { AxiosError } from 'axios';

export function useLogin(
  options: MutateOptions<
    LoginResponse,
    AxiosError<Error>,
    LoginInput,
    DefaultQueryKeyWithoutData
  > = {}
) {
  return useMutation({
    mutationFn: login,
    ...options,
  });
}