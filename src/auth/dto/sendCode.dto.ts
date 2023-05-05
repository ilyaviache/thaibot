import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendCodeDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
