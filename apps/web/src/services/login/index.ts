import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { LoginInput, LoginResponse} from './request';
import { login } from './request';

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