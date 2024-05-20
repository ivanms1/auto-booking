import { IsInt, IsOptional } from 'class-validator';

export class SearchBookingsDto {
  @IsOptional()
  @IsInt()
  skip?: number;

  @IsOptional()
  @IsInt()
  take?: number;
}
