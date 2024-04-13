import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookingController } from './bookings.controller';
import { BookingService } from './bookings.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
