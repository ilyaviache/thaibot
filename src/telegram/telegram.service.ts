import { Injectable } from '@nestjs/common';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import { NewMessageDataDTO } from 'src/bot/dto/new-message-data.dto';
import { ConfigService } from '@nestjs/config';
import input from 'input';
import { BotService } from 'src/bot/bot.service';
import { AREAS } from 'src/bot/bot.constants';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class TelegramService {
  private client: TelegramClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService,
    private readonly settingsService: SettingsService
  ) {
    const apiId = +configService.get<number>('TELEGRAM_API_ID');
    const apiHash = configService.get<string>('TELEGRAM_API_HASH');
    const stringSession = new StringSession(
      configService.get<string>('TELEGRAM_SESSION_KEY')
    );

    (async () => {
      console.log('Loading interactive example...');
      this.client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
      });
      await this.client.start({
        phoneNumber: async () => await input.text('number ?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
      });

      console.log('You should now be connected.');
      console.log(this.client.session.save()); // Save this string to avoid logging in again

      async function handleNewMessage(event: NewMessageEvent) {
        const message = event.message;
        const text = message.text;

        const channelId = message?.peerId['channelId'];
        const senderId = message.senderId;
        const messageId = message.id;

        if (!channelId) return;

        const result = await this.client.invoke(
          new Api.channels.GetFullChannel({
            channel: channelId,
          })
        );
        const channelData = result.chats[0];

        if (
          !this.settingsService
            .AREAS_FIND('all')
            .usernames.includes(channelData['username'])
        )
          return;

        const user = await this.client.invoke(
          new Api.users.GetFullUser({
            id: senderId,
          })
        );

        const newMessage = new NewMessageDataDTO({
          messageId,
          text,
          fromUsername: user.users[0]['username'],
          channelUsername: channelData['username'],
          channelName: channelData['title'],
        });

        botService.handleListenedMessage(newMessage);
      }

      // adds an event handler for new messages
      this.client.addEventHandler(handleNewMessage, new NewMessage({}));
      this.logUserChats();
    })();
  }

  private async logUserChats() {
    // Получаем список всех диалогов
    const dialogs = await this.client.getDialogs();

    // Перебираем все диалоги и выводим ID чатов в консоль
    dialogs.forEach(async (dialog) => {
      console.log(`Chat ID: ${dialog.id}`);

      const result = await this.client.invoke(
        new Api.channels.GetFullChannel({
          channel: dialog.id,
        })
      );
      const channelData = result.chats[0];
      const username = channelData['username'];
      // console.log(`Chat username: ${channelData['username']}`);
      if (!AREAS[0].usernames.includes(username)) {
        console.log(`Chat username: ${username}`);
      }
    });
  }
}
