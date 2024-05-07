import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards } from '@nestjs/common';
import { type User, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { SearchUsersDto } from './dto/search-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.usersService.user(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Param() params: SearchUsersDto): Promise<User[]> {
    return this.usersService.users(params);
  }

  @Post()
  async createUser(@Body() createUser: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.createUser(createUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string): Promise <User | null> {
    return this.usersService.deleteUser({id});
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() updateUser: Prisma.UserUpdateInput): Promise <User | null> {
    return this.usersService.updateUser({ where: { id }, data: updateUser })
  }
}
