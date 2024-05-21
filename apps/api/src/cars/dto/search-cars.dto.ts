import { IsInt, IsOptional } from 'class-validator';

export class SearchCarsDto {
  @IsOptional()
  @IsInt()
  skip?: number;

  @IsOptional()
  @IsInt()
  take?: number;
}
