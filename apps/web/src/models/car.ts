import { Booking } from "./booking";

export type Car = {
  id: string;
  model: string;
  mileage: number;
  bookings: Booking[];
};
