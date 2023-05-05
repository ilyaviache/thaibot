import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: true })
  username: string;

  @ApiProperty({ required: true })
  email: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
