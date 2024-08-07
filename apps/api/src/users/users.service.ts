import { Injectable } from '@nestjs/common';
import type { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

export const roundsOfHashing = 10;

export interface UserReturn {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(id: string): Promise<UserReturn | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async users(params: { skip?: number; take?: number }): Promise<UserReturn[]> {
    const { skip, take } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, roundsOfHashing);

    data.password = hashedPassword;
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (typeof data.password === 'string') {
      data.password = await bcrypt.hash(data.password, roundsOfHashing);
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
