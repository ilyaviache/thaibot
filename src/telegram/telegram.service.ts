import { Injectable } from '@nestjs/common';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import bigInt from 'big-integer';
import input from 'input';

function checkWordsInText(text, words) {
  const lowercaseText = text.toLowerCase();

  for (const word of words) {
    const lowercaseWord = word.toLowerCase();

    // Ищем слово в тексте
    if (lowercaseText.includes(lowercaseWord)) {
      return true;
    }
  }

  return false;
}

@Injectable()
export class TelegramService {
  private client: TelegramClient;

  constructor(
    private readonly configService: ConfigService,
    @InjectBot() private bot: Telegraf
  ) {
    const apiId = +configService.get<number>('TELEGRAM_API_ID');
    const apiHash = configService.get<string>('TELEGRAM_API_HASH');
    const stringSession = new StringSession(
      configService.get<string>('TELEGRAM_SESSION_KEY')
    );

    // 45007781
    // 39731028

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
      await this.bot.telegram.sendMessage('39731028', 'Урааа, работает!');
      // const result = await client.invoke(
      //   new Api.contacts.ResolveUsername({
      //     username: 'ilyaviache',
      //   })
      // );
      // console.log(result);
      // const userId = result.users[0].id;

      // const sendResult = await client.sendMessage(userId, {
      //   message: 'test 123',
      // });
      // console.log('sendResult', sendResult);
      async function eventPrint(event: NewMessageEvent) {
        const message = event.message;
        const text = message.text;

        if (
          checkWordsInText(text, [
            'bike',
            'байк',
            'скутер',
            'мотоцикл',
            'мопед',
            'мот',
            'pcx',
            'nmax',
            'xmax',
            'forza',
            'click',
            'нмакс',
            'дрон',
            'drone',
          ])
        ) {
          const chanellId = message.peerId['channelId'];

          // sender & message data
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

          const channelName = channelData['title'];
          const channelUsername = channelData['username'];

          const senderUsername = user.users[0]['username'];

          const report = `
          Username: @${senderUsername}\n
          Channel: ${channelName} @${channelUsername}\n
          Message: ${text}\n
        `;

          const to = 'test_booooottaaaaaaa';
          if (to !== `${channelUsername}`) {
            await client.sendMessage(to, { message: report });
            await client.forwardMessages(to, {
              fromPeer: message.peerId,
              messages: messageId,
            });
          }
        }
      }

      // adds an event handler for new messages
      client.addEventHandler(eventPrint, new NewMessage({}));
    })();
  }
}
