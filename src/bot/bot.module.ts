import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  providers: [BotResolver, BotService],
  controllers: [BotController],
})
export class BotModule { }
