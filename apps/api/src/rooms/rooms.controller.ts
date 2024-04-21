import { Controller, Get, Param } from '@nestjs/common';
import { type Room } from '@prisma/client';
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
}
