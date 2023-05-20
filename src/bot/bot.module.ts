import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotListener } from './bot.listener';
import { WorksModule } from 'src/works/works.module';
import { TelegrafModule } from 'nestjs-telegraf';

import { AccountsScene } from './scenes/accounts.scene';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    WorksModule,
    TelegrafModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BotUpdate, BotResolver, BotService, BotListener, AccountsScene],
  controllers: [BotController],
  exports: [BotService, BotListener],
})
export class BotModule { }
