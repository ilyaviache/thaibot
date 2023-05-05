import { Injectable } from '@nestjs/common';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConnectionArgs } from 'src/page/connection-args.dto';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) { }

  create(createRoomDto: CreateRoomDto, user: UserEntity) {
    return this.prisma.room.create({ data: { ...createRoomDto, userId: user.id } });
  }

  findAll(connectionArgs: ConnectionArgs, user: UserEntity) {
    return findManyCursorConnection(
      (args) => this.prisma.room.findMany({
        ...args,
        where: {
          userId: user.id
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      () => this.prisma.room.count({
        where: {
          userId: user.id
        }
      }),
      connectionArgs
    );
  }

  findOne(id: string, user: UserEntity) {
    return this.prisma.room.findFirst({ where: { id, userId: user.id } })
  }

  update(id: string, updateRoomDto: UpdateRoomDto, user: UserEntity) {
    return this.prisma.room.update({
      where: {
        userIds: {
          id: id,
          userId: user.id
        },
      },
      data: updateRoomDto,
    });
  }

  remove(id: string, user: UserEntity) {
    return this.prisma.room.delete({
      where: {
        userIds: {
          id: id,
          userId: user.id
        },
      },
    });
  }
}
