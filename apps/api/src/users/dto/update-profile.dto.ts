import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  address1!: string;

  @IsInt()
  @Min(0)
  zipCode!: number;

  @ValidateIf((_object, value) => value !== undefined)
  @IsOptional()
  @IsString()
  address2?: string;
}