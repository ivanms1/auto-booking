import { createQueryKeys } from '@lukemorales/query-key-factory';
import { API_ROUTES } from '@/services/apiRoutes';
import { QUERY_KEYS } from '@/services/queryKeys';
import type { User } from '@/models/user';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';
import type { UpdateSchemaType } from '@/pages/Profile/BasicInformationForm';
import type { EmailSchemaType } from '@/pages/Profile/ChangeEmail';
import type { PasswordSchemaType } from '@/pages/Profile/ChangePassword';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export interface UsersResponse {
  users: User[];
  total_page: number;
  total_count: number;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export function getUsers(): Promise<User[]> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.list),
    method: METHODS.GET,
  });
}

export function getUser(id: string): Promise<User> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.detail, { id }),
    method: METHODS.GET,
  });
}

export function createUser(data: UserInput): Promise<User> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.create),
    method: METHODS.POST,
    data,
  });
}

export function uploadImage(file: File): Promise<User> {
  const formData = new FormData();
  formData.append('file', file);
  
  return serviceFetch({
    url: getRoute(API_ROUTES.users.upload),
    method: METHODS.POST,
    data: formData,
  })
}

export function updateUser(data: UpdateSchemaType): Promise<User> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.update),
    method: METHODS.PUT,
    data,
  });
}

export function updateUserEmail(data: EmailSchemaType): Promise<User> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.email),
    method: METHODS.PUT,
    data,
  });
}

export function updateUserPassword(data: PasswordSchemaType): Promise<User> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.password),
    method: METHODS.PUT,
    data,
  });
}

export function deleteUser(id: string): Promise<string> {
  return serviceFetch({
    url: getRoute(API_ROUTES.users.delete, { id }),
    method: METHODS.DELETE,
  });
}

export const userQueryKeys = createQueryKeys(QUERY_KEYS.USERS, {
  list: () => ({
    queryKey: ['users'],
    queryFn: getUsers,
  }),
  detail: (id: string) => ({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
  }),
});
