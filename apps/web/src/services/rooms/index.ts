import type { MutateOptions} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { DefaultQueryKeyWithoutData } from '@/interfaces/query';
import type { Room } from '@/models/room';
import type { RoomInput} from './request';
import { createRoom, deleteRoom, updateRoom } from './request';

export function useCreateRoom(
  options: MutateOptions<
    Room,
    AxiosError<Error>,
    RoomInput,
    DefaultQueryKeyWithoutData
  > = {}
) {
  return useMutation({
    mutationFn: createRoom,
    ...options,
  });
}

export function useUpdateRoom(
  onSuccess?: (
    data: Room,
    variables: { id: string; data: Room },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void
) {
  return useMutation<Room, AxiosError<Error>, { id: string; data: Room }>({
    mutationFn: ({ id, data }) => updateRoom(id, data),
    onError,
  });
}

export const useDeleteRoom = (
  onSuccess?: (
    data: boolean,
    variables: { id: string },
    context?: unknown
  ) => void,
  onError?: (error: AxiosError<Error>) => void,
) => {
  return useMutation<string, AxiosError<Error>, { id: string }>({
    mutationFn: ({ id }) => deleteRoom(id),
    onError,
  });
};
