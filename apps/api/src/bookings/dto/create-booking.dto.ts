import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  carId?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  roomId?: string;
}