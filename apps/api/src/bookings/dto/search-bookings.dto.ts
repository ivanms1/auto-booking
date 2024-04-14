import { IsInt } from 'class-validator';

export class SearchBookingsDto {
  @IsInt()
  skip?: number;

  @IsInt()
  take?: number;
}
