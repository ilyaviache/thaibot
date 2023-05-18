import { Injectable } from '@nestjs/common';
import { Markup, Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { replyOrEdit } from './bot.utils';
import { BUTTONS, TEXT } from './bot.constants';
import { InjectBot } from 'nestjs-telegraf';
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

  async start(ctx: Context) { }
}
