import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Works } from '@prisma/client';
import { UpsertWorksInput } from './dto/upsert-works.input';

@Injectable()
export class WorksService {
  constructor(private readonly prisma: PrismaService) {}

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

  async addListenWord(work: Works, word: string): Promise<Works | null> {
    work.listenWords.push(word);
    return await this.update(work.id, work);
  }

  async removeListenWord(work: Works, index: number): Promise<Works | null> {
    work.listenWords.splice(index, 1);
    return await this.update(work.id, work);
  }

  async removeAllListenWords(work: Works): Promise<Works | null> {
    work.listenWords = [];
    return await this.update(work.id, work);
  }

  async addMuteWord(work: Works, word: string): Promise<Works | null> {
    work.muteWords.push(word);
    return await this.update(work.id, work);
  }

  async removeMuteWord(work: Works, index: number): Promise<Works | null> {
    work.muteWords.splice(index, 1);
    return await this.update(work.id, work);
  }

  async removeAllMuteWords(work: Works): Promise<Works | null> {
    work.muteWords = [];
    return await this.update(work.id, work);
  }

  async addMuteChannel(work: Works, channel: any): Promise<Works | null> {
    work.muteChannelUsernames.push(channel);
    return await this.update(work.id, work);
  }

  async removeMuteChannel(work: Works, index: number): Promise<Works | null> {
    work.muteChannelUsernames.splice(index, 1);
    return await this.update(work.id, work);
  }

  async removeAllMuteChannels(work: Works): Promise<Works | null> {
    work.muteChannelUsernames = [];
    return await this.update(work.id, work);
  }

  async addMuteAccount(work: Works, account: any): Promise<Works | null> {
    work.muteUsernames.push(account);
    return await this.update(work.id, work);
  }

  async removeMuteAccount(work: Works, index: number): Promise<Works | null> {
    work.muteUsernames.splice(index, 1);
    return await this.update(work.id, work);
  }

  async removeAllMuteAccounts(work: Works): Promise<Works | null> {
    work.muteUsernames = [];
    return await this.update(work.id, work);
  }
}
