import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;
}