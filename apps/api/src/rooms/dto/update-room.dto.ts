import { IsNotEmpty, ValidateIf, IsString } from 'class-validator';

export class UpdateRoomDto {
  @ValidateIf((_object, value) => value !== undefined)
  @IsString()
  @IsNotEmpty()
  name?: string;
}