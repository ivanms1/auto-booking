import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import type { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from '../prisma.service';

export const roundsOfHashing = 10;

export interface UserReturn {
  id: string;
  name: string;
  email: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  avatar?: string | null;
}

export interface InputPassword {
  password: string;
  duplicatePassword: string;
  newPassword: string;
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}

  async user(id: string): Promise<UserReturn | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        avatar: true
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
        role: true,
        avatar: true
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

  async updatePassword(params: {
    where: Prisma.UserWhereUniqueInput;
    inputData: InputPassword;
  }): Promise<User> {
    const { where, inputData } = params;
    const user = await this.prisma.user.findUnique({ where });

    if (!user) {
      throw new NotFoundException(`No user found`);
    }

    if (inputData.password !== inputData.duplicatePassword) {
      throw new Error('Passwords are not equal');
    }

    const isPasswordValid = await bcrypt.compare(
      inputData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    if (typeof inputData.newPassword === 'string') {
      inputData.newPassword = await bcrypt.hash(
        inputData.newPassword,
        roundsOfHashing
      );
    }

    const data: Prisma.UserUpdateInput = { password: inputData.newPassword };

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async addUpdateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (!data.address1 || !data.location || !data.name || !data.zipCode) {
      throw new Error('Missing Argumengts');
    }

    if (
      data.email ||
      data.password ||
      data.createdAt ||
      data.updatedAt ||
      data.id
    ) {
      throw new Error('Wrong Arguments');
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

  async updateEmail(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    if (!data.email) {
      throw new Error('Missing Email');
    }

    if (
      data.name ||
      data.password ||
      data.createdAt ||
      data.updatedAt ||
      data.id ||
      data.address1 ||
      data.address2 ||
      data.location ||
      data.zipCode
    ) {
      throw new Error('Wrong Arguments');
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }

  async uploadImageToCloudinary(
    file: Express.Multer.File,
    user: User
  ) {
    const where: Prisma.UserWhereUniqueInput = {id: user.id};
    

    return this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    }).then((response) => {
      const data: Prisma.UserUpdateInput = {avatar: response.secure_url}
      return this.prisma.user.update({
        data,
        where,
      });
      
    });
  }
}
