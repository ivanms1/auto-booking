import type { Car } from "./car";
import type { Room } from "./room";
import type { User } from "./user";

export interface Booking {
  title: string;
  id: string;
  startDate: Date;
  endDate: Date;
  startMileage: number | undefined;
  endMileage: number | undefined;
  authorId: string;
  roomId: string | undefined;
  carId: string | undefined;
  car: Car | undefined;
  room: Room | undefined;
  author: User;
  description: string | undefined
}
