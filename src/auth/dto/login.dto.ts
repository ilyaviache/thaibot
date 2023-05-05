import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email is invalid' })
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  code: string;
}
