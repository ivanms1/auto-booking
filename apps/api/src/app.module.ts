import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './users/users.module';
import { BookingModule } from './bookings/bookings.module';
import { RoomModule } from './rooms/rooms.module';
import { CarModule } from './cars/cars.module';

@Module({
  imports: [
    UserModule,
    BookingModule,
    RoomModule,
    CarModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../web', 'dist'),
    }),
  ],
})
export class AppModule {}
