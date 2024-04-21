import { IsInt } from 'class-validator';

export class SearchCarsDto {
  @IsInt()
  skip?: number;

  @IsInt()
  take?: number;
}
