import { Injectable } from '@nestjs/common';
import type { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async users(params: { skip?: number; take?: number }): Promise<User[]> {
    const { skip, take } = params;
    return this.prisma.user.findMany({
      skip,
      take,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      data.password,
      roundsOfHashing,
    );

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
      data.password = await bcrypt.hash(
        data.password,
        roundsOfHashing,
      );
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
