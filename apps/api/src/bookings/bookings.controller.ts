import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Prisma, User, type Booking } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecoded } from 'src/auth/user.decorator';
import { BookingService, BookingUpdate } from './bookings.service';
import { SearchBookingsDto } from './dto/search-bookings.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBooking(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.booking(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBookings(@Param() params: SearchBookingsDto): Promise<Booking[]> {
    return this.bookingService.bookings(params);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @UserDecoded() user: User,
    @Body() data: Prisma.BookingCreateInput
  ): Promise<Booking> {
    return this.bookingService.createBooking(data, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBooking(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.deleteBooking({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBooking: BookingUpdate
  ): Promise<Booking | null> {
    return this.bookingService.updateBooking({ where: { id }, data: updateBooking });
  }
}
