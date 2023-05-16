import { Injectable } from '@nestjs/common';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import bigInt from 'big-integer';
import input from 'input';

const sessionString =
  '1BQANOTEuMTA4LjU2LjE1NAG7LWX5TQhXJPtI/JR707hcT+RmMvbFlN7//zQzkaozXGKbYY0XMBmnY61O4nNeha5Hx2XyP9iRz6E/rquDTRuuEEAKMADtAQnPrKS9SRjHAt7YxO12yxTWnciU9jrWglZ1wxwx2L1qSsxWlolbNf810euBfVWQH/Tiu6X5CRzvKLxSXExnkIYDoIcv6vEK44oFlHE0Wqyhe/Ay2NiNIVGQZrpK0P7HjBLOU+aPRaRwqI/qOHp4YjqXz7peaPMkywDYdnpV5YW5XiRPwnq77pI9NyrYhQlH+RWTWJNw57Xm4ldLj79MIfVhLrvTa75m9dbYtq87+SkopbIGTBgIm1LZXQ==';

@Injectable()
export class TelegramService {
  private client: TelegramClient;

  constructor() {
    const apiId = 26775843;
    const apiHash = '35f1cfd51cde86ffe6a656ecf6cffb06';
    const stringSession = new StringSession(sessionString); // fill this later with the value from session.save()
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

      const result = await client.invoke(
        new Api.contacts.ResolveUsername({
          username: 'ilyaviache',
        })
      );
      console.log(result);
      const userId = result.users[0].id;

      // const sendResult = await client.sendMessage(userId, {
      //   message: 'test 123',
      // });
      // console.log('sendResult', sendResult);
      async function eventPrint(event: NewMessageEvent) {
        const message = event.message;

        const chanellId = message.peerId['channelId'];
        console.log('chanellId', chanellId);
        // sender & message data
        const senderId = message.senderId;
        const text = message.text;
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

        console.log('user', user.users);
        const senderUsername = user.users[0]['username'];

        const report = `
          Username: @${senderUsername}\n
          Channel: ${channelName} @${channelUsername}\n
          Message: ${text}\n
        `;

        const to = bigInt('1811574497');

        await client.sendMessage(to, { message: report });
        await client.forwardMessages(to, {
          fromPeer: message.peerId,
          messages: messageId,
        });
      }
      // adds an event handler for new messages
      client.addEventHandler(eventPrint, new NewMessage({}));
    })();
  }
}
