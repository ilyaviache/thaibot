import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { Context } from './bot.interface';
import { InjectBot } from 'nestjs-telegraf';
import { message } from 'telegram/client';

import { NewMessageDataDTO } from './dto/new-message-data.dto';

import { WorksService } from 'src/works/works.service';
import { UsersService } from 'src/users/users.service';
import { Works } from 'src/works/models/works.model';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class BotService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly worksService: WorksService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
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
        let wordsFound = false; // Флаг для отслеживания успешной проверки

        for (const keys of work.listenWords) {
          // Check if listenWord contains "+" and replace it with a space
          const cleanedKeys = keys
            .split(' ')
            .map((key) => (key.includes('+') ? key.replace(/\+/g, ' ') : key));

          // Check if at least one word from work.listenWords exists in the text
          wordsFound = cleanedKeys.some((word) =>
            text.toLowerCase().includes(word.toLowerCase().toString())
          );

          for (const cleanedListenWord of cleanedKeys) {
            if (text.toLowerCase().includes(cleanedListenWord.toLowerCase())) {
              wordsFound = true; // Установить флаг в true, если проверка успешна
            } else {
              wordsFound = false; // Сбросить флаг в false, если не найдено совпадение
              break; // Прервать цикл, если не найдено совпадение
            }
          }
        }
        // Check that none of the words from work.muteWords are included in the text
        const muteWordsFound = work.muteWords.some((word) =>
          text.includes(word.toString())
        );
        // Check if fromUsername is not present in work.muteUsernames
        const isMutedUser = work.muteUsernames.includes(fromUsername);
        if (wordsFound && !muteWordsFound && !isMutedUser) {
          const report = `
            Message: ${text}
            \nUsername: @${fromUsername}
            \nChannel: ${channelName} @${channelUsername}    
            \nMessage Link: https://t.me/${channelUsername}/${message.messageId}\n
            `;

          await this.messagesService.createMessage(work.id, message);
          await this.sendMessage(work.chatId, report, message, work.id);
        }
      }
    }
  }

  async sendBaseMessage(message: any) {
    await this.bot.telegram.sendMessage(message.chatId, message.text);
    return;
  }

  async sendMessage(
    chatId: string,
    text: string,
    message: NewMessageDataDTO,
    work_id: string
  ) {
    await this.bot.telegram.sendMessage(chatId, text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🚫 Замьютить канал',
              callback_data: `mute_channel@${message.channelUsername}@${work_id}`,
            },
          ],
          [
            {
              text: '🚫 Замьютить пользователя',
              callback_data: `mute_username@${message.fromUsername}@${work_id}`,
            },
          ],
        ],
      },
    });
    return;
  }
}
