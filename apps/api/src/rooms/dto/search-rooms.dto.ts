import { IsInt, IsOptional } from 'class-validator';

export class SearchRoomsDto {
  @IsOptional()
  @IsInt()
  skip?: number;

  @IsOptional()
  @IsInt()
  take?: number;
}
