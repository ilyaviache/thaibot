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
    // const text = message.text;
    // const chatUsername = message.chatUsername;
    // const fromUsername = message.fromUsername;
    // const works = await this.worksService.findAll();
    // for (const work of works) {
    //   // Check if chatUsername is listed in work.listenChatUsernames
    //   if (
    //     work.listenChannelUsernames.includes(chatUsername) &&
    //     !work.muteChannelUsernames.includes(chatUsername)
    //   ) {
    //     // Check if at least one word from work.listenWords exists in the text
    //     const wordsFound = work.listenWords.some((word) =>
    //       text.includes(word.toString())
    //     );
    //     // Check that none of the words from work.muteWords are included in the text
    //     const muteWordsFound = work.muteWords.some((word) =>
    //       text.includes(word.toString())
    //     );
    //     // Check if fromUsername is not present in work.muteUsernames
    //     const isMutedUser = work.muteUsernames.includes(fromUsername);
    //     if (wordsFound && !muteWordsFound && !isMutedUser) {
    //       this.sendMessage(work.chatId, `Match found for work: ${work.id}`);
    //     }
    //   }
    // }
  }

  async sendBaseMessage(message: any) {
    console.log(message);
    await this.bot.telegram.sendMessage(message.chatId, message.text);
    return;
  }

  async sendMessage(chatId: string, text: string) {
    console.log(message);
    await this.bot.telegram.sendMessage(chatId, text);
    return;
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
