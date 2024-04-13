import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { BookingModule } from './bookings/bookings.module';

@Module({
  imports: [UserModule, BookingModule],
})
export class AppModule {}
