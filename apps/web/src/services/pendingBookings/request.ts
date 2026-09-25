import { API_ROUTES } from '../apiRoutes';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';
import type { Booking } from '@/models/booking';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
} as const;

export function getPendingBookings(): Promise<Booking[]> {
  return serviceFetch({
    url: getRoute(API_ROUTES.pendingBookings.list),
    method: METHODS.GET,
  });
}

export function approveBooking(id: string): Promise<Booking> {
  return serviceFetch({
    url: getRoute(API_ROUTES.pendingBookings.approve, { id }),
    method: METHODS.POST,
  });
}

export function rejectBooking(id: string): Promise<Booking> {
  return serviceFetch({
    url: getRoute(API_ROUTES.pendingBookings.reject, { id }),
    method: METHODS.POST,
  });
}