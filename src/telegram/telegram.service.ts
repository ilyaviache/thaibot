import { Injectable } from '@nestjs/common';
import { Api, TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import input from 'input';

const sessionString =
  '1BQANOTEuMTA4LjU2LjE3OQG7CSgBqsPE1Yube3Ij//v5IL0pVArPgW/LsBPHwm3KugmpJrNhnTvUUbppMQMFOX0HVtwrAMZwniQ70pqDLYua4DUFd9A4RtBO/m82fk2NZ6NWfH/Va89InQa4Mi5vCneypzjULTjYiRXdipd5Nii0J5hKvpddZUEIu8xl00ncClWafDa1lgon4lCnVeRmQ+qlub1mQXAvQ15LlXqsy7WzEhcXHg4Dl5fZV4yPyo7b379I7/Mhd8QaE4nZmvxcGTAKAni7C6VcSm4kaCPzEM3OMFK/yLM1H+G5uinMKD7HhBJjphv5Mq4LLCqx+GrKWygINkktzb5iDvKGxEAhPiESBA==';

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

      const sendResult = await client.sendMessage(userId, {
        message: 'test 123',
      });
      console.log('sendResult', sendResult);
      async function eventPrint(event: NewMessageEvent) {
        const message = event.message;

        console.log('ID: ', message.senderId);
        console.log('TEXT:', message.text);

        // console.log(await client.getMe());

        // await client.sendMessage(userId, { message: 'test' });
      }
      // adds an event handler for new messages
      client.addEventHandler(eventPrint, new NewMessage({}));
    })();
  }
}
