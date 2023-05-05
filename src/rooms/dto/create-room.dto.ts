import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, MaxLength } from 'class-validator';

export class CreateRoomDto {
  @IsOptional()
  @MaxLength(150)
  @ApiProperty({ required: false, default: '' })
  name?: string = '';

  @ApiProperty({ required: false, default: {} })
  data?: object | Array<[]> = {};
}
