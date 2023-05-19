import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Works } from '@prisma/client';
import { UpsertWorksInput } from './dto/upsert-works.input';
import { WorkDTO } from './dto/work.dto';
import { Int } from '@nestjs/graphql';

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
      where: { chatId },
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

  async deleteAll(): Promise<number | null> {
    const { count } = await this.prisma.works.deleteMany();
    return count;
  }

  async startWork(input: UpsertWorksInput): Promise<Works | null> {
    const work = await this.findByChatId(input.chatId.toString());
    if (!work) {
      return await this.prisma.works.create({
        data: {
          chatId: input.chatId.toString(),
        },
      });
    } else {
      return work;
    }
  }
}
