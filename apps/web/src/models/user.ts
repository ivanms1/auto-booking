import type { Booking } from "./booking";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  bookings: Booking[];
  createdAt: string;
  location?: string;
  address1?: string;
  address2?: string;
  zipCode:  number;
  avatar: string;
  role: 'USER' | 'ADMIN'
}
