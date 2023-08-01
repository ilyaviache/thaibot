import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Works, User } from '@prisma/client';
import { UpsertWorksInput } from './dto/upsert-works.input';
import { AREAS, PRESETS } from 'src/bot/bot.constants';

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

  async findByAllByChatId(chatId: string): Promise<Works[] | null> {
    return this.prisma.works.findMany({
      where: { chatId },
    });
  }

  async findByChatId(chatId: string): Promise<Works | null> {
    return this.prisma.works.findFirst({
      where: { chatId },
    });
  }

  async create(data: any): Promise<Works> {
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

  async initNewTaskForUser(user: User, name: string): Promise<Works | null> {
    const data = {
      chatId: user.chatId,
      name,
      selectedChatsId: null,
      listenChannelUsernames: [],
      listenWords: [],
      muteChannelUsernames: [],
      muteUsernames: [],
      muteWords: [],
      userId: user.id,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    return this.create(data);
  }

  async startWork(input: UpsertWorksInput): Promise<Works | null> {
    // TODO: this logic has been changed
    const work = await this.findByChatId(input.chatId.toString());
    // if (!work) {
    //   return await this.prisma.works.create({
    //     data: {
    //       chatId: input.chatId.toString(),
    //     },
    //   });
    // } else {
    //   return work;
    // }
    return work;
  }

  async setArea(work: Works, id: number): Promise<Works | null> {
    const area = AREAS.find((area) => area.id === id);
    work.selectedChatsId = area.id;
    work.listenChannelUsernames = area.usernames;
    console.log('test -->', work, area, id, 'test <--');
    return await this.update(work.id, work);
  }

  async setPreset(work: Works, id: number): Promise<Works | null> {
    const preset = PRESETS.find((preset) => preset.id === id);
    work.listenWords = preset.words;
    return await this.update(work.id, work);
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
