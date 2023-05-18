import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotListener } from './bot.listener';

@Module({
  providers: [BotUpdate, BotResolver, BotService, BotListener],
  controllers: [BotController],
  exports: [BotService, BotListener],
})
export class BotModule { }
