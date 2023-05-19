import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotListener } from './bot.listener';
import { WorksService } from 'src/works/works.service';

@Module({
  providers: [BotUpdate, BotResolver, BotService, BotListener, WorksService],
  controllers: [BotController],
  exports: [BotService, BotListener],
})
export class BotModule { }
