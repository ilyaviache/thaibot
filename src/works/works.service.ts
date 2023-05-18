import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Works } from '@prisma/client';

@Injectable()
export class WorksService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Works[]> {
    return this.prisma.works.findMany();
  }

  async findById(id: string): Promise<Works | null> {
    return this.prisma.works.findUnique({
      where: { id },
    });
  }

  async findByChatId(chatId: string): Promise<Works | null> {
    return this.prisma.works.findFirst({
      where: { chat_id: chatId },
    });
  }

  async create(data: Works): Promise<Works> {
    return this.prisma.works.create({
      data,
    });
  }

  async update(id: string, data: Works): Promise<Works | null> {
    return this.prisma.works.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Works | null> {
    return this.prisma.works.delete({
      where: { id },
    });
  }
}
