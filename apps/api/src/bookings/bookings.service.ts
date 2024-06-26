import { BadRequestException, Injectable } from '@nestjs/common';
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

export interface BookingUpdate {
  startDate: Date | string;
  endDate: Date | string;
  description?: string | null;
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
    const { roomId, carId, startDate, endDate, ...rest } = data;
    
    const overlappingBookings = await this.prisma.booking.findMany({
      where: {
        OR: [
          { roomId: roomId ? roomId : undefined },
          { carId: carId ? carId : undefined }
        ],
        AND: [
          {
            startDate: {
              lt: endDate,
            },
          },
          {
            endDate: {
              gt: startDate,
            },
          },
        ],
      },
    });
  
    if (overlappingBookings.length > 0) {
      throw new BadRequestException('Overlap Booking', { cause: new Error(), description: 'There is another reservation in the schedule.' })
    }


    const createData: Prisma.BookingCreateInput = {
      ...rest,
      startDate,
      endDate,
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
    data: BookingUpdate;
  }): Promise<Booking> {
    const { data, where } = params;
    const dataToUpdate = await this.prisma.booking.findUnique({where})

    const { startDate, endDate, ...rest } = data;

    const roomId = dataToUpdate?.roomId
    const carId = dataToUpdate?.carId

    const overlappingBookings = await this.prisma.booking.findMany({
      where: {
        AND: [
          {
            OR: [
              { roomId: roomId ? roomId : undefined },
              { carId: carId ? carId : undefined }
            ],
          },
          {
            startDate: {
              lt: endDate,
            },
          },
          {
            endDate: {
              gt: startDate,
            },
          },
          {
            id: {
              not: where.id,
            },
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException('Overlap Booking', { cause: new Error(), description: 'There is another reservation in the schedule.' })
    }

    const createData: BookingUpdate = {
      ...rest,
      startDate,
      endDate
    };
    
    return this.prisma.booking.update({
      data: createData,
      where,
    });
  }

  async deleteBooking(where: Prisma.BookingWhereUniqueInput): Promise<Booking> {
    return this.prisma.booking.delete({
      where,
    });
  }
}
