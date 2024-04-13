import { Controller, Get, Param } from '@nestjs/common';
import { type User } from '@prisma/client';
import { UserService } from './users.service';
import { SearchUsersDto } from './dto/search-users.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user(id);
  }

  @Get('')
  async getUsers(@Param() params: SearchUsersDto): Promise<User[]> {
    return this.userService.users(params);
  }
}
