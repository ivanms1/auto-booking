import { Injectable } from '@nestjs/common';
import type { Booking, Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import type { SearchBookingsDto } from './dto/search-bookings.dto';

interface CreateInput {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  startMileage?: number | null;
  endMileage?: number | null;
  description?: string | null;
  roomId?: string | undefined;
  carId?: string | undefined;
}

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

  async createBooking(data: CreateInput, user: User): Promise<Booking> {
    const { roomId, carId, ...rest } = data;

    const createData: Prisma.BookingCreateInput = {
      ...rest,
      author: {
        connect: {
          id: user.id,
        },
      },
    };

    if (roomId) {
      createData.room = { connect: { id: roomId } };
    }

    if (carId) {
      createData.car = { connect: { id: carId } };
    }

    return this.prisma.booking.create({
      data: createData,
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
