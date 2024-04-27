import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Prisma, type Booking } from '@prisma/client';
import { BookingService } from './bookings.service';
import { SearchBookingsDto } from './dto/search-bookings.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get(':id')
  async getBooking(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.booking(id);
  }

  @Get()
  async getBookings(@Param() params: SearchBookingsDto): Promise<Booking[]> {
    return this.bookingService.bookings(params);
  }

  @Post()
  async createBooking(
    @Body() data: Prisma.BookingCreateInput
  ): Promise<Booking> {
    return this.bookingService.createBooking(data);
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.deleteBooking({ id });
  }

  @Put(':id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBooking: Prisma.BookingUpdateInput
  ): Promise<Booking | null> {
    return this.bookingService.updateBooking({ where: { id }, data: updateBooking });
  }
}
