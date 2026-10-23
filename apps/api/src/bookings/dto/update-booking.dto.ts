import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateBookingDto {
  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string | null;
}