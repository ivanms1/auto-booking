import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Booking, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import type { SearchBookingsDto } from './dto/search-bookings.dto';
import type { UpdateBookingDto } from './dto/update-booking.dto';

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

  private findApprovedOverlaps(
    client: Pick<Prisma.TransactionClient, 'booking'>,
    input: {
      roomId?: string | null;
      carId?: string | null;
      startDate: Date | string;
      endDate: Date | string;
      excludeId?: string;
    }
  ) {
    const resources = [
      ...(input.roomId ? [{ roomId: input.roomId }] : []),
      ...(input.carId ? [{ carId: input.carId }] : []),
    ];

    if (resources.length === 0) {
      return Promise.resolve([]);
    }

    return client.booking.findMany({
      where: {
        OR: resources,
        startDate: { lt: input.endDate },
        endDate: { gt: input.startDate },
        status: 'APPROVED',
        ...(input.excludeId ? { id: { not: input.excludeId } } : {}),
      },
    });
  }

  async getMyBookings(user: User): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        authorId: user.id,
        status: {
          in: ['PENDING', 'REJECTED'],
        },
      },
      include: {
        car: true,
        room: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPendingBookings(user: User): Promise<Booking[]> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view pending bookings');
    }
    return this.prisma.booking.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        car: true,
        room: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async approveBooking(id: string, user: User): Promise<Booking> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can approve bookings');
    }

    try {
      return await this.prisma.$transaction(
        async (tx) => {
          const booking = await tx.booking.findUnique({
            where: { id },
          });

          if (!booking) {
            throw new NotFoundException('Booking not found');
          }

          if (booking.status !== 'PENDING') {
            throw new ConflictException(
              'Only pending bookings can be approved'
            );
          }

          const overlappingBookings = await this.findApprovedOverlaps(tx, {
            roomId: booking.roomId,
            carId: booking.carId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            excludeId: booking.id,
          });

          if (overlappingBookings.length > 0) {
            throw new BadRequestException('Overlap Booking', {
              cause: new Error(),
              description: 'There is another reservation in the schedule.',
            });
          }

          return tx.booking.update({
            where: { id, status: 'PENDING' },
            data: { status: 'APPROVED' },
          });
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2034'
      ) {
        throw new ConflictException(
          'The booking schedule changed concurrently. Please retry.'
        );
      }

      throw error;
    }
  }

  async rejectBooking(id: string, user: User): Promise<Booking> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can reject bookings');
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.status !== 'PENDING') {
      throw new ConflictException('Only pending bookings can be rejected');
    }

    try {
      return await this.prisma.booking.update({
        where: { id, status: 'PENDING' },
        data: { status: 'REJECTED' },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const currentBooking = await this.prisma.booking.findUnique({
          where: { id },
        });

        if (!currentBooking) {
          throw new NotFoundException('Booking not found');
        }

        throw new ConflictException('Booking is no longer pending');
      }

      throw error;
    }
  }

  async booking(id: string, user: User): Promise<Booking> {
    const visibility: Prisma.BookingWhereInput =
      user.role === 'ADMIN'
        ? {}
        : { OR: [{ status: 'APPROVED' }, { authorId: user.id }] };

    const booking = await this.prisma.booking.findFirst({
      where: { id, ...visibility },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async bookings(
  params: SearchBookingsDto,
  user: User
): Promise<Booking[]> {
  const { skip, take } = params;

  const visibility: Prisma.BookingWhereInput =
    user.role === 'ADMIN'
      ? {}
      : { OR: [{ status: 'APPROVED' }, { authorId: user.id }] };

  return this.prisma.booking.findMany({
    where: visibility,
    skip,
    take,
  });
}

  async createBooking(data: CreateInput, user: User): Promise<Booking> {
    const { roomId, carId, startDate, endDate, ...rest } = data;

    const overlappingBookings = await this.findApprovedOverlaps(this.prisma, {
      roomId,
      carId,
      startDate,
      endDate,
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException('Overlap Booking', {
        cause: new Error(),
        description: 'There is another reservation in the schedule.',
      });
    }

    const createData: Prisma.BookingCreateInput = {
      ...rest,
      startDate,
      endDate,
      status: 'PENDING',
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
    data: UpdateBookingDto;
    user: User;
  }): Promise<Booking> {
    const { data, where, user } = params;
    const booking = await this.prisma.booking.findUnique({ where });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (user.role !== 'ADMIN' && booking.authorId !== user.id) {
      throw new ForbiddenException('You can only update your own bookings');
    }

    const { startDate, endDate, ...rest } = data;

    const overlappingBookings = await this.findApprovedOverlaps(this.prisma, {
      roomId: booking.roomId,
      carId: booking.carId,
      startDate,
      endDate,
      excludeId: booking.id,
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException('Overlap Booking', {
        cause: new Error(),
        description: 'There is another reservation in the schedule.',
      });
    }

    const createData: UpdateBookingDto = {
      ...rest,
      startDate,
      endDate,
    };

    const status = booking.status === 'APPROVED' ? 'PENDING' : booking.status;

    return this.prisma.booking.update({
      data: {
        ...createData,
        status,
      },
      where,
    });
  }

  async deleteBooking(params: {
    where: Prisma.BookingWhereUniqueInput;
    user: User;
  }): Promise<Booking> {
    const { where, user } = params;
    const booking = await this.prisma.booking.findUnique({ where });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (user.role !== 'ADMIN' && booking.authorId !== user.id) {
      throw new ForbiddenException('You can only delete your own bookings');
    }
    return this.prisma.booking.delete({
      where,
    });
  }
}
