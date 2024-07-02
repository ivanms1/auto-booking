import { createQueryKeys } from '@lukemorales/query-key-factory';
import type { Car } from '@/models/car';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';
import { API_ROUTES } from '../apiRoutes';
import { QUERY_KEYS } from '../queryKeys';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export interface CarsResponse {
  cars: Car[];
  total_page: number;
  total_count: number;
}

export interface CarInput {
  name: string,
  mileage: number
}

export function getCars(): Promise<Car[]> {
  return serviceFetch({
    url: getRoute(API_ROUTES.cars.list),
    method: METHODS.GET
  });
}

export function getCar(id: string): Promise<Car> {
  return serviceFetch({
    url: getRoute(API_ROUTES.cars.detail, { id }),
    method: METHODS.GET,
  });
}

export function createCar(data: CarInput): Promise<Car> {
  return serviceFetch({
    url: getRoute(API_ROUTES.cars.create),
    method: METHODS.POST,
    data,
  });
}

export function updateCar(id: string, data: Car): Promise<Car> {
  return serviceFetch({
    url: getRoute(API_ROUTES.cars.update, { id }),
    method: METHODS.PUT,
    data,
  });
}

export function deleteCar(id: string): Promise<string> {
  return serviceFetch({
    url: getRoute(API_ROUTES.cars.delete, { id }),
    method: METHODS.DELETE,
  });
}

export const carQueryKeys = createQueryKeys(QUERY_KEYS.CARS, {
  list: () => ({
    queryKey: ['cars'],
    queryFn: getCars,
  }),
  detail: (id: string) => ({
    queryKey: ['cars', id],
    queryFn: () => getCar(id),
  }),
});
