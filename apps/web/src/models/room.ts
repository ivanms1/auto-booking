import type { Booking } from "./booking";

export interface Room {
  id: string;
  name: string;
  bookings: Booking[];
  createdAt: string;
}
