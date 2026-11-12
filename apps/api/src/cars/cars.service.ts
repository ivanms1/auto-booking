import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { Car, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import type { CreateCarDto } from './dto/create-car.dto';
import type { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async car(id: string): Promise<Car | null> {
    return this.prisma.car.findUnique({
      where: { id },
    });
  }

  async cars(params: { skip?: number; take?: number }): Promise<Car[]> {
    const { skip, take } = params;
    return this.prisma.car.findMany({
      skip,
      take,
    });
  }

  async createCar(data: CreateCarDto, user: User): Promise<Car> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can create a new car');
    }
    return this.prisma.car.create({ data });
  }

  async updateCar(
    params: {
      where: Prisma.CarWhereUniqueInput;
      data: UpdateCarDto;
    },
    user: User
  ): Promise<Car> {
    const { where, data } = params;
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can update a car');
    }
    try {
      return await this.prisma.car.update({
        data,
        where,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Car not found');
      }
      throw error;
    }
  }

  async deleteCar(where: Prisma.CarWhereUniqueInput, user: User): Promise<Car> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can delete a car');
    }
    try {
      return await this.prisma.car.delete({ where });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'You cannot delete this car because it is referenced by other records.'
        );
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Car not found');
      }
      throw error;
    }
  }
}
