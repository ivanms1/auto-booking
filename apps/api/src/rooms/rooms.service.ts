import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma} from '@prisma/client';
import type { Room, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import type { CreateRoomDto } from './dto/create-room.dto';
import type { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async room(id: string): Promise<Room | null> {
    return this.prisma.room.findUnique({
      where: { id },
    });
  }

  async rooms(params: { skip?: number; take?: number }): Promise<Room[]> {
    const { skip, take } = params;
    return this.prisma.room.findMany({
      skip,
      take,
    });
  }

  async createRoom(data: CreateRoomDto, user: User): Promise<Room> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create a new room');
    }
    return this.prisma.room.create({
      data,
    });
  }

  async updateRoom(
    params: {
      where: Prisma.RoomWhereUniqueInput;
      data: UpdateRoomDto;
    },
    user: User
  ): Promise<Room> {
    const { where, data } = params;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can update a room');
    }
    try {
      return await this.prisma.room.update({
        data,
        where,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Room not found');
      }
      throw error;
    }
  }

  async deleteRoom(
    where: Prisma.RoomWhereUniqueInput,
    user: User
  ): Promise<Room> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete a room');
    }
    try {
        return await this.prisma.room.delete({ where });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2003'
        ) {
          throw new ConflictException('You cannot delete this room because it is referenced by other records.');
        }
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2025'
        ) {
          throw new NotFoundException('Room not found');
        }
        throw error;
      }
  }
}
