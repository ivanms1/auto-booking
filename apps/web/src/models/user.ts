import { Booking } from "./booking";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  bookings: Booking[];
};
