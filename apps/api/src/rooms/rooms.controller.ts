import { Controller, Get, Param, Body, Delete, Post, Put, UseGuards } from '@nestjs/common';
import { type Room, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecoded } from 'src/auth/user.decorator';
import { RoomService } from './rooms.service';
import { SearchRoomsDto } from './dto/search-rooms.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getrooms(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.room(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@Param() params: SearchRoomsDto): Promise<Room[]> {
    return this.roomService.rooms(params);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Body() data: CreateRoomDto, @UserDecoded() user: User
  ): Promise<Room> {
    return this.roomService.createRoom(data, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRoom(@Param('id') id: string, @UserDecoded() user: User): Promise<Room | null> {
    return this.roomService.deleteRoom({ id }, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateRoom(
    @Param('id') id: string,
    @Body() updateRoom: UpdateRoomDto, @UserDecoded() user: User
  ): Promise<Room | null> {
    return this.roomService.updateRoom({ where: { id }, data: updateRoom }, user);
  }
}
