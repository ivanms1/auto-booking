import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { type User, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { UserReturn} from './users.service';
import { UserService, InputPassword } from './users.service';
import { SearchUsersDto } from './dto/search-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<UserReturn | null> {
    return this.userService.user(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Param() params: SearchUsersDto): Promise<UserReturn[]> {
    return this.userService.users(params);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() createUser: Prisma.UserCreateInput): Promise<User> {
    return this.userService.createUser(createUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.deleteUser({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: Prisma.UserUpdateInput
  ): Promise<User | null> {
    return this.userService.updateUser({ where: { id }, data: updateUser });
  }

  @Put(':id/update')
  @UseGuards(JwtAuthGuard)
  async addUpdateUser(
    @Param('id') id: string,
    @Body() updateUser: Prisma.UserUpdateInput
  ): Promise<User | null> {
    return this.userService.addUpdateUser({ where: { id }, data: updateUser });
  }

  @Put(':id/update-email')
  @UseGuards(JwtAuthGuard)
  async updateEmail(
    @Param('id') id: string,
    @Body() updateUser: Prisma.UserUpdateInput
  ): Promise<User | null> {
    return this.userService.updateEmail({ where: { id }, data: updateUser });
  }

  @Put(':id/password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePassword:InputPassword
  ): Promise<User | null> {
    return this.userService.updatePassword({ where: { id }, inputData: updatePassword });
  }
}
