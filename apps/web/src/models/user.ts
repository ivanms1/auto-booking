import type { Booking } from "./booking";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  bookings: Booking[];
  createdAt: string;
  avatar: string
}
