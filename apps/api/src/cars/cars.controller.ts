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
import { type Car, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecoded } from 'src/auth/user.decorator';
import { CarService } from './cars.service';
import { SearchCarsDto } from './dto/search-cars.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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
  async createCar(@Body() data: CreateCarDto, @UserDecoded() user: User,): Promise<Car> {
    return this.carService.createCar(data, user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCar(@Param('id') id: string, @UserDecoded() user: User,): Promise<Car | null> {
    return this.carService.deleteCar({ id }, user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCar(
    @Param('id') id: string,
    @Body() updateCar: UpdateCarDto,
    @UserDecoded() user: User
  ): Promise<Car | null> {
    return this.carService.updateCar({ where: { id }, data: updateCar }, user);
  }
}
