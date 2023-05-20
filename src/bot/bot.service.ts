import { Injectable } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { InjectBot } from 'nestjs-telegraf';
import { BUTTONS } from './bot.constants';

@Injectable()
export class BotService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>
  ) { }

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
        keyboard: [
          [{ text: 'Button 1' }, { text: 'Button 2' }],
          [{ text: 'Button 3' }, { text: 'Button 4' }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply('Start bot text', replyMarkup);
  }

  async accounts(ctx: Context): Promise<any> {
    const buttons = [BUTTONS.BACK];
    const keyboard = Markup.keyboard(buttons);

    const replyMarkup = {
      reply_markup: {
        keyboard: [[{ text: 'Назад' }, { text: 'Button 2' }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply('Accounts', replyMarkup);
  }
}
