import { Injectable } from '@nestjs/common';
import type { Car, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

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

  async createCar(data: Prisma.CarCreateInput): Promise<Car> {
    return this.prisma.car.create({
      data,
    });
  }

  async updateCar(params: {
    where: Prisma.CarWhereUniqueInput;
    data: Prisma.CarUpdateInput;
  }): Promise<Car> {
    const { where, data } = params;
    return this.prisma.car.update({
      data,
      where,
    });
  }

  async deleteCar(where: Prisma.CarWhereUniqueInput): Promise<Car> {
    return this.prisma.car.delete({
      where,
    });
  }
}
