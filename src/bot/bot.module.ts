import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotListener } from './bot.listener';
import { WorksModule } from 'src/works/works.module';
import { TelegrafModule } from 'nestjs-telegraf';

import { AccountsScene } from './scenes/accounts.scene';
import { botMiddleware } from './bot.middleware';

@Module({
  imports: [
    WorksModule,
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        middlewares: [botMiddleware],
        include: [BotModule],
      }),
    }),
  ],
  providers: [BotUpdate, BotResolver, BotService, BotListener, AccountsScene],
  controllers: [BotController],
  exports: [BotService, BotListener],
})
export class BotModule { }
