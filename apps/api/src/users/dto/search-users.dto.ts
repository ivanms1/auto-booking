import { IsInt, IsOptional } from 'class-validator';

export class SearchUsersDto {
  @IsOptional()
  @IsInt()
  skip?: number;

  @IsOptional()
  @IsInt()
  take?: number;
}
