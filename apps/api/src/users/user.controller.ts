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
import { UserService } from './user.service';
import { SearchUsersDto } from './dto/search-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Param() params: SearchUsersDto): Promise<User[]> {
    return this.userService.users(params);
  }

  @Post()
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
}
