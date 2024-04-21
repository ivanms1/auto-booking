import { IsInt } from 'class-validator';

export class SearchRoomsDto {
  @IsInt()
  skip?: number;

  @IsInt()
  take?: number;
}
