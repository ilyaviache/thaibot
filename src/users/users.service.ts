import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InitUserInput } from './dto/init-user.input';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  updateUser(userId: string, newUserData: UpdateUserInput) {
    return this.prisma.user.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  async initUser(initUserData: InitUserInput) {
    return this.prisma.user.upsert({
      create: initUserData,
      update: initUserData,
      where: { chatId: initUserData.chatId },
    });
  }

  async findByChatId(chatId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { chatId },
    });
  }
}
