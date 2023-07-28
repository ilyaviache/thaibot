import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { InjectBot } from 'nestjs-telegraf';
import { MENUS, TEXTS } from './bot.constants';
import { message } from 'telegram/client';

import { NewMessageDataDTO } from './dto/new-message-data.dto';
import { InitUserInput } from 'src/users/dto/init-user.input';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BotService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly worksService: WorksService,
    private readonly usersService: UsersService
  ) {}

  // entry point to a main bot logic, all messages will be handled here
  async handleListenedMessage(message: NewMessageDataDTO): Promise<any> {
    const text = message.text;
    const channelUsername = message.channelUsername;
    const channelName = message.channelName;
    const fromUsername = message.fromUsername;
    const works = await this.worksService.findAll();

    for (const work of works) {
      // Check if channelUsername is listed in work.listenchannelUsernames
      if (
        work.listenChannelUsernames.includes(channelUsername) &&
        !work.muteChannelUsernames.includes(channelUsername)
      ) {
        // Check if at least one word from work.listenWords exists in the text
        const wordsFound = work.listenWords.some((word) =>
          text.toLowerCase().includes(word.toLowerCase().toString())
        );
        // Check that none of the words from work.muteWords are included in the text
        const muteWordsFound = work.muteWords.some((word) =>
          text.includes(word.toString())
        );
        // Check if fromUsername is not present in work.muteUsernames
        const isMutedUser = work.muteUsernames.includes(fromUsername);
        if (wordsFound && !muteWordsFound && !isMutedUser) {
          const report = `
            Username: @${fromUsername}\n
            Channel: ${channelName} @${channelUsername}\n
            Message: ${text}\n
            `;
          this.sendMessage(work.chatId, report);
        }
      }
    }
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
    const initUserInput = new InitUserInput({
      chatId: ctx.from.id.toString(),
      username: ctx.from.username,
      firstname: ctx.from.first_name,
    });
    const result = await this.usersService.initUser(initUserInput);
    ctx.session.user = result;

    const replyMarkup = {
      reply_markup: {
        keyboard: MENUS.MAIN_MENU,
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };

    return ctx.reply(TEXTS.MAIN.WELCOME, replyMarkup);
  }
}
