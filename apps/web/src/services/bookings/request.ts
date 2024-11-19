import { createQueryKeys } from '@lukemorales/query-key-factory';
import { QUERY_KEYS } from '../queryKeys';
import { API_ROUTES } from '../apiRoutes';
import type { Booking } from '@/models/booking';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export interface BookingUpdate {
  startDate: Date,
  endDate: Date,
  description: string | undefined
}

export interface BookingsResponse {
  bookings: Booking[];
  total_page: number;
  total_count: number;
}

 export interface BookingInput {
  title: string,
  startDate: Date,
  endDate: Date,
}

export function getBookings(): Promise<Booking[]> {
  return serviceFetch({
    url: getRoute(API_ROUTES.bookings.list),
    method: METHODS.GET,
  });
}

export function getBooking(id: string): Promise<Booking> {
  return serviceFetch({
    url: getRoute(API_ROUTES.bookings.detail, { id }),
    method: METHODS.GET,
  });
}

export function createBooking(data: BookingInput): Promise<Booking> {
  return serviceFetch({
    url: getRoute(API_ROUTES.bookings.create),
    method: METHODS.POST,
    data,
  });
}

export function updateBooking(id: string, data: BookingUpdate): Promise<Booking> {
  return serviceFetch({
    url: getRoute(API_ROUTES.bookings.update, { id }),
    method: METHODS.PUT,
    data,
  });
}

export function deleteBooking(id: string): Promise<string> {
  return serviceFetch({
    url: getRoute(API_ROUTES.bookings.delete, { id }),
    method: METHODS.DELETE,
  });
}

export const bookingQueryKeys = createQueryKeys(QUERY_KEYS.BOOKINGS, {
  list: () => ({
    queryKey: ['bookings'],
    queryFn: getBookings,
  }),
  detail: (id: string) => ({
    queryKey: ['bookings', id],
    queryFn: () => getBooking(id),
  }),
});
