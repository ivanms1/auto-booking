import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CarController } from './cars.controller';
import { CarService } from './cars.service';

@Module({
  controllers: [CarController],
  providers: [CarService, PrismaService],
})
export class CarModule {}
