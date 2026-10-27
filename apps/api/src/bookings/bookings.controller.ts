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
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('pending')
  @UseGuards(JwtAuthGuard)
  async getPendingBookings(@UserDecoded() user: User): Promise<Booking[]> {
    return this.bookingService.getPendingBookings(user);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyBookings(@UserDecoded() user: User): Promise<Booking[]> {
    return this.bookingService.getMyBookings(user);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard)
  async approveBooking(
    @Param('id') id: string,
    @UserDecoded() user: User
  ): Promise<Booking> {
    return this.bookingService.approveBooking(id, user);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard)
  async rejectBooking(
    @Param('id') id: string,
    @UserDecoded() user: User
  ): Promise<Booking> {
    return this.bookingService.rejectBooking(id, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getBooking(@Param('id') id: string, @UserDecoded() user: User): Promise<Booking | null> {
    return this.bookingService.booking(id, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBookings(@Param() params: SearchBookingsDto, @UserDecoded() user: User): Promise<Booking[]> {
    return this.bookingService.bookings(params, user);
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
  async deleteBooking(
    @Param('id') id: string,
    @UserDecoded() user: User
  ): Promise<Booking> {
    return this.bookingService.deleteBooking({ where: { id }, user });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateBooking(
    @UserDecoded() user: User,
    @Param('id') id: string,
    @Body() updateBooking: UpdateBookingDto
  ): Promise<Booking | null> {
    return this.bookingService.updateBooking({
      where: { id },
      data: updateBooking,
      user,
    });
  }
}
