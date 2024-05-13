import { Room } from '@/models/room';
import { getRoute } from '@/utils/route';
import { serviceFetch } from '@/utils/service';
import { createQueryKeys } from '@lukemorales/query-key-factory';

import { API_ROUTES } from '../apiRoutes';
import { QUERY_KEYS } from '../queryKeys';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export type RoomsResponse = {
  rooms: Room[];
  total_page: number;
  total_count: number;
};

export type RoomInput = {
  name: string
}

export function getRooms(): Promise<Room[]> {
  return serviceFetch({
    url: getRoute(API_ROUTES.rooms.list),
    method: METHODS.GET,
  });
}

export function getRoom(id: string): Promise<Room> {
  return serviceFetch({
    url: getRoute(API_ROUTES.rooms.detail, { id }),
    method: METHODS.GET,
  });
}

export function createRoom(data: RoomInput): Promise<Room> {
  return serviceFetch({
    url: getRoute(API_ROUTES.rooms.create),
    method: METHODS.POST,
    data,
  });
}

export function updateRoom(id: string, data: Room): Promise<Room> {
  return serviceFetch({
    url: getRoute(API_ROUTES.rooms.update, { id }),
    method: METHODS.PUT,
    data,
  });
}

export function deleteRoom(id: string): Promise<string> {
  return serviceFetch({
    url: getRoute(API_ROUTES.rooms.delete, { id }),
    method: METHODS.DELETE,
  });
}

export const roomQueryKeys = createQueryKeys(QUERY_KEYS.ROOMS, {
  list: () => ({
    queryKey: ['rooms'],
    queryFn: getRooms,
  }),
  detail: (id: string) => ({
    queryKey: ['rooms', id],
    queryFn: () => getRoom(id),
  }),
});
