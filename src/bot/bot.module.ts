import { Module } from '@nestjs/common';
import { BotResolver } from './bot.resolver';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotListener } from './bot.listener';
import { TelegrafModule } from 'nestjs-telegraf';

import { botMiddleware } from './bot.middleware';

import { TasksScene } from './scenes/tasks.scene';
import { AccountsScene } from './scenes/accounts.scene';
import { AreaScene } from './scenes/area.scene';
import { AccountsAddScene } from './scenes/accounts-add.scene';
import { WorksScene } from './scenes/works.scene';
import { WorksAddScene } from './scenes/works-add.scene';
import { WordsScene } from './scenes/words.scene';
import { WordsAddScene } from './scenes/words-add.scene';
import { ChannelsScene } from './scenes/channels.scene';
import { ChannelsAddScene } from './scenes/channels-add.scene';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';
import { BotNavigationService } from './bot-navigation.service';
import { MessagesService } from 'src/messages/messages.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        middlewares: [botMiddleware],
        include: [BotModule],
      }),
    }),
  ],
  providers: [
    BotResolver,
    BotListener,
    BotService,
    UsersService,
    WorksService,
    MessagesService,
    BotNavigationService,
    BotUpdate,

    TasksScene,
    AccountsScene,
    AreaScene,
    AccountsAddScene,
    WorksScene,
    WorksAddScene,
    WordsScene,
    WordsAddScene,
    ChannelsScene,
    ChannelsAddScene,
  ],
  controllers: [BotController],
  exports: [BotService, BotListener],
})
export class BotModule {}
