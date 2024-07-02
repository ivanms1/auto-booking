import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { User } from '@/models/user';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';
import { API_ROUTES } from '../apiRoutes';
import { QUERY_KEYS } from '../queryKeys';

const METHODS = {
  POST: 'POST',
  GET: 'GET',
} as const;

export interface LoginResponse {
  accessToken: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export function login(data: LoginInput): Promise<LoginResponse> {
  return serviceFetch({
    url: getRoute(API_ROUTES.login),
    method: METHODS.POST,
    data,
  });
}

export function authUser(): Promise<User> {
  return serviceFetch({
    url: getRoute(API_ROUTES.authuser),
    method: METHODS.GET,
  });
}

export const authQueryKey = createQueryKeys(QUERY_KEYS.AUTHUSER, {
  detail: () => ({
    queryKey: ['authuser'],
    queryFn: authUser,
  }),
});
