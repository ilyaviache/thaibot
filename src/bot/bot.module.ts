import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';

@Module({
  providers: [BotResolver],
  controllers: [BotController]
})
export class BotModule {}
