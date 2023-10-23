import { Controller, Get, Param } from '@nestjs/common';
import { WorksService } from './works.service';
import { Works } from '@prisma/client';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  async findAll(): Promise<Works[]> {
    return this.worksService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Works | null> {
    return this.worksService.findById(id);
  }

  @Get('chat/:chatId')
  async findByChatId(@Param('chatId') chatId: string): Promise<Works | null> {
    return this.worksService.findByChatId(chatId);
  }
}
