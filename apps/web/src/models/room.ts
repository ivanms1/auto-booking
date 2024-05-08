import { Booking } from "./booking";

export type Room = {
  id: string;
  name: string;
  bookings: Booking[]
};
