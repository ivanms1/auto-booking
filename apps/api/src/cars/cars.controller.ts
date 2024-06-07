import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { type Car, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CarService } from './cars.service';
import { SearchCarsDto } from './dto/search-cars.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getcars(@Param('id') id: string): Promise<Car | null> {
    return this.carService.car(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCars(@Param() params: SearchCarsDto): Promise<Car[]> {
    return this.carService.cars(params);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createCar(@Body() createCar: Prisma.CarCreateInput): Promise<Car> {
    return this.carService.createCar(createCar);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCar(@Param('id') id: string): Promise<Car | null> {
    return this.carService.deleteCar({ id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCar(
    @Param('id') id: string,
    @Body() updateCar: Prisma.CarUpdateInput
  ): Promise<Car | null> {
    return this.carService.updateCar({ where: { id }, data: updateCar });
  }
}
