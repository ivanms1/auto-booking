import type { Booking } from "./booking";

export interface Car {
  id: string;
  model: string;
  mileage: number;
  bookings: Booking[];
  createdAt: string
}
