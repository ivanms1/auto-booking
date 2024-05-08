import { API_ROUTES } from '../apiRoutes';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';

const METHODS = {
  POST: 'POST',
} as const;

export type LoginResponse = {
  accessToken: string;
};

export type LoginInput = {
  email: string,
  password: string,
}

export function login(data: LoginInput): Promise<LoginResponse> {
  return serviceFetch({
    url: getRoute(API_ROUTES.login),
    method: METHODS.POST,
    data,
  });
}