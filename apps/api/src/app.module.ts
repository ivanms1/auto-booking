import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { BookingModule } from './bookings/bookings.module';
import { RoomModule } from './rooms/rooms.module';
import { CarModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    BookingModule,
    RoomModule,
    CarModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../web', 'dist'),
    }),
    AuthModule,
  ],
})
export class AppModule {}
