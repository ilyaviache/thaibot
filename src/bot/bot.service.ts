import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from './bot.interface';
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

  async sendMessage() { }

  async start(ctx: Context) { }
}
