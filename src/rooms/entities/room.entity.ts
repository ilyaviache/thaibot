import { Room } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entity/user.entity';

export class RoomEntity implements Room {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, default: '' })
  name: string | '';

  @ApiProperty({ required: false, default: {} })
  data: object | Array<[]> = {};

  userId: string;

  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }
}
