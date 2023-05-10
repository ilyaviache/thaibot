import { Injectable } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import input from 'input';

const sessionString =
  '1BQANOTEuMTA4LjU2LjE3OQG7SERU2v0Po8CeG3FO4fjekR8nctHWS6P0K+4uwbEWYuwgIGIYqgHWT8qgl7VYhmHXrCWx457YTs/LfBNTfEiYgcAeLFrzjjpo1mmQNoT2j1flbwUqJrXwa8orfuzF8/nVOIh/Pv/3KP/Hxplo7TKnqlNctbRV+wRlYyP/lwSANFwAY9AkWiswaiWDAr8xz6LJT2aEQPJ5Szbyi7bIQRkDeiXNMSRtlQhAPu9GJwpLK+78jJ23kzOUh6fwAFia7NFFwiC2RQTKiv0KYtZy6Exqt9UXqcgpIMJqrhy9kXSYR5A1lj97aRy7/X8QpsHofO1yTpzNLWcUGTpeYL2tKSRk1Q==';

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

      async function eventPrint(event: NewMessageEvent) {
        const message = event.message;

        console.log('ID: ', message.senderId);
        console.log('TEXT:', message.text);
      }
      // adds an event handler for new messages
      client.addEventHandler(eventPrint, new NewMessage({}));
    })();
  }
}
