import { Controller, Get, Param, Body, Delete, Post, Put } from '@nestjs/common';
import { type Room, Prisma } from '@prisma/client';
import { RoomService } from './rooms.service';
import { SearchRoomsDto } from './dto/search-rooms.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get(':id')
  async getrooms(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.room(id);
  }

  @Get()
  async getUsers(@Param() params: SearchRoomsDto): Promise<Room[]> {
    return this.roomService.rooms(params);
  }

  @Post()
  async createRoom(
    @Body() data: Prisma.RoomCreateInput
  ): Promise<Room> {
    return this.roomService.createRoom(data);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') id: string): Promise<Room | null> {
    return this.roomService.deleteRoom({ id });
  }

  @Put(':id')
  async updateRoom(
    @Param('id') id: string,
    @Body() updateRoom: Prisma.RoomUpdateInput
  ): Promise<Room | null> {
    return this.roomService.updateRoom({ where: { id }, data: updateRoom });
  }
}
