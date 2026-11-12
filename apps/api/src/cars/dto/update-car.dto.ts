import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateCarDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  model?: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsInt()
  @Min(0)
  mileage?: number;
}