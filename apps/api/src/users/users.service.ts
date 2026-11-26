import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from '../prisma.service';
import type { UpdateEmailDto } from './dto/update-email.dto';
import type { UpdateProfileDto } from './dto/update-profile.dto';

export const roundsOfHashing = 10;
const publicUserSelect = {
  id: true,
  name: true,
} satisfies Prisma.UserSelect;

const adminUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
  avatar: true,
  location: true,
  address1: true,
  address2: true,
  zipCode: true,
} satisfies Prisma.UserSelect;

type PublicUser = Prisma.UserGetPayload<{
  select: typeof publicUserSelect;
}>;
type AdminUser = Prisma.UserGetPayload<{
  select: typeof adminUserSelect;
}>;
export type UserListItem = PublicUser | AdminUser;

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
        avatar: true,
      },
    });
  }

  async userForRequest(
  id: string,
  role: User['role']
): Promise<PublicUser | AdminUser | null> {
  if (role === 'ADMIN') {
    return this.prisma.user.findUnique({
      where: { id },
      select: adminUserSelect,
    });
  }

  return this.prisma.user.findUnique({
    where: { id },
    select: publicUserSelect,
  });
}

  async users(params: { skip?: number; take?: number }, role: User['role']): Promise<UserListItem[]> {
    const { skip, take } = params;

    if (role === 'ADMIN') {
    return this.prisma.user.findMany({
      skip,
      take,
      select: adminUserSelect,
    });
  }

    return this.prisma.user.findMany({
      skip,
      take,
      select: publicUserSelect,
    });
  }

  async createUser(
    data: Prisma.UserCreateInput,
    user: User
  ): Promise<UserReturn> {
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('No Authorization to create user');
    }

    const email = data.email.trim().toLowerCase();

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, roundsOfHashing);

    return this.prisma.user.create({
      data: {
        ...data,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        avatar: true,
      },
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

    if (inputData.newPassword !== inputData.duplicatePassword) {
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
    data: UpdateProfileDto;
  }): Promise<User> {
    const { where, data } = params;

    if (!data.address1 || !data.location || !data.name || !data.zipCode) {
      throw new Error('Missing Argumengts');
    }

    return this.prisma.user.update({
      where,
      data: {
        name: data.name,
        location: data.location,
        address1: data.address1,
        zipCode: data.zipCode,
        ...(data.address2 !== undefined && { address2: data.address2 }),
      },
    });
  }

  async deleteUser(id: string, requestingUser: User): Promise<User> {
    if (requestingUser.id !== id && requestingUser.role !== 'ADMIN') {
      throw new ForbiddenException('You cannot delete this user');
    }
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      }

      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException('Cannot delete a user with bookings');
      }

      throw error;
    }
  }

  async updateEmail(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateEmailDto;
  }): Promise<User> {
    const { where, data } = params;

    try {
      return await this.prisma.user.update({
        where,
        data: {
          email: data.email.trim().toLowerCase(),
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }

      throw error;
    }
  }

  async uploadImageToCloudinary(file: Express.Multer.File, user: User) {
    const where: Prisma.UserWhereUniqueInput = { id: user.id };

    try {
      const response = await this.cloudinary.uploadImage(file);
      const data: Prisma.UserUpdateInput = {
        avatar: String(response.secure_url),
      };

      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw new BadRequestException('Invalid file type.');
    }
  }
}
