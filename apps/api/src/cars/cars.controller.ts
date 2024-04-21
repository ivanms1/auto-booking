import { Controller, Get, Param } from '@nestjs/common';
import { type Car } from '@prisma/client';
import { CarService } from './cars.service';
import { SearchCarsDto } from './dto/search-cars.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get(':id')
  async getcars(@Param('id') id: string): Promise<Car | null> {
    return this.carService.car(id);
  }

  @Get()
  async getCars(@Param() params: SearchCarsDto): Promise<Car[]> {
    return this.carService.cars(params);
  }
}
