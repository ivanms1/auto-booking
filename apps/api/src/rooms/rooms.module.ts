import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoomController } from './rooms.controller';
import { RoomService } from './rooms.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
})
export class RoomModule {}
