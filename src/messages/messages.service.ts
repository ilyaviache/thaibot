import { PrismaService } from 'nestjs-prisma';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Messages } from '@prisma/client';
import { NewMessageDataDTO } from 'src/bot/dto/new-message-data.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  // get all messages by work id sorted by createdAt
  async findAllByWorkId(workId: string, limit: number = 20): Promise<Messages[]> {
    return this.prisma.messages.findMany({
      where: { workId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // add new message to work
  async createMessage(
    workId: string,
    message: NewMessageDataDTO,
  ): Promise<Messages> {
    return this.prisma.messages.create({
      data: {
        messageId: message.messageId.toString(),
        workId,
        username: message.fromUsername,
        channelUsername: message.channelUsername
      },
    });
  }
}
