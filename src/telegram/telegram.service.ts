import { Injectable } from '@nestjs/common';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import { NewMessageDataDTO } from 'src/bot/dto/new-message-data.dto';
import { ConfigService } from '@nestjs/config';
import input from 'input';
import { BotService } from 'src/bot/bot.service';

@Injectable()
export class TelegramService {
  private client: TelegramClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly botService: BotService
  ) {
    const apiId = +configService.get<number>('TELEGRAM_API_ID');
    const apiHash = configService.get<string>('TELEGRAM_API_HASH');
    const stringSession = new StringSession(
      configService.get<string>('TELEGRAM_SESSION_KEY')
    );

    (async () => {
      console.log('Loading interactive example...');
      const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
      });
      await client.start({
        phoneNumber: async () => await input.text('number ?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
      });

      console.log('You should now be connected.');
      console.log(client.session.save()); // Save this string to avoid logging in again

      async function handleNewMessage(event: NewMessageEvent) {
        const message = event.message;
        const text = message.text;

        const chanellId = message.peerId['channelId'];
        const senderId = message.senderId;
        const messageId = message.id;

        const result = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: chanellId,
          })
        );
        const channelData = result.chats[0];

        const user = await client.invoke(
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
      client.addEventHandler(handleNewMessage, new NewMessage({}));
    })();
  }
}
