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
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @UserDecoded() user: User,
    @Body() data: Prisma.BookingCreateInput
  ): Promise<Booking> {
    return this.bookingService.createBooking(data, user);
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
