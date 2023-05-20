import { Injectable } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { InjectBot } from 'nestjs-telegraf';
import { MENUS } from './bot.constants';
import { message } from 'telegram/client';
import { NewMessage } from 'telegram/events';

import { NewMessageDataDTO } from './dto/new-message-data.dto';
import { WorksService } from 'src/works/works.service';

@Injectable()
export class BotService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly worksService: WorksService
  ) { }

  // entry point to a main bot logic, all messages will be handled here
  async handleListenedMessage(message: NewMessageDataDTO): Promise<any> {
    const text = message.text;
    const works = this.worksService.findAll();
    // TODO: main job here
  }

  async sendBaseMessage(message: any) {
    console.log(message);
    await this.bot.telegram.sendMessage(message.chatId, message.text);
    return;
  }

  async sendMessage(message: any) {
    console.log(message);
  }

  async start(ctx: Context): Promise<any> {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply('Start bot text', replyMarkup);
  }

  async accounts(ctx: Context): Promise<any> {
    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.ACCOUNTS_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply('Accounts', replyMarkup);
  }
}
