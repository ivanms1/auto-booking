import { Injectable } from '@nestjs/common';
import type { Booking, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import type { SearchBookingsDto } from './dto/search-bookings.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async booking(id: string): Promise<Booking | null> {
    return this.prisma.booking.findUnique({
      where: { id },
    });
  }

  async bookings(params: SearchBookingsDto): Promise<Booking[]> {
    const { skip, take } = params;
    return this.prisma.booking.findMany({
      skip,
      take,
    });
  }

  async createBooking(data: Prisma.BookingCreateInput): Promise<Booking> {
    return this.prisma.booking.create({
      data,
    });
  }

  async updateBooking(params: {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.BookingUpdateInput;
  }): Promise<Booking> {
    const { data, where } = params;
    return this.prisma.booking.update({
      data,
      where,
    });
  }

  async deleteBooking(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
    return this.prisma.booking.delete({
      where,
    });
  }
}
