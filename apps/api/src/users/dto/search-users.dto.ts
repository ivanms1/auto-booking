import { IsInt } from 'class-validator';

export class SearchUsersDto {
  @IsInt()
  skip?: number;

  @IsInt()
  take?: number;
}
