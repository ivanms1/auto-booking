import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './users/users.module';
import { BookingModule } from './bookings/bookings.module';

@Module({
  imports: [
    UserModule,
    BookingModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../web', 'dist'),
    }),
  ],
})
export class AppModule {}
