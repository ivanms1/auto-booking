import { Car } from "./car";
import { Room } from "./room";
import { User } from "./user";

export type Booking = {
  id: string;
  startDate: Date;
  endDate: Date;
  startMileage: Number | undefined;
  endMileage: Number | undefined;
  authorId: string;
  roomId: string | undefined;
  carId: string | undefined;
  car: Car | undefined;
  room: Room | undefined;
  author: User;
};
