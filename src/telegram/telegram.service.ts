import { Injectable } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage } from 'telegram/events';
import { NewMessageEvent } from 'telegram/events/NewMessage';
import input from 'input';

const sessionString =
  '1BQANOTEuMTA4LjU2LjE1OQG7rrJueUfk96H6vjY6OZfVe15fZlqmcIawaYhHTtfB7KCGPjVHdtfVE4ozwIMk+jdVY5Mv46YDgn3e4hFU8gTJTfo4IbSeH3j/cRiM3KudOKpsqiHPotKHWxMt6CXmZ2GBIo3oshKm5uY3UYfNb9dYe2zawbajCcbWJiGW3E0fFJpNhkiNFBM7PXz+yLBe3C1Z3pyBL0eM8Xz7O0XRav5IjaHs7l4YUaHH5u6xmyqzLzmsZuEYLnu9rHz8muZT0ipp+cbY4ZEgynmG97f0fziq8lbcDAXAGlsZqFT/ERtaOqZDvQsd8kmbd4xyAt9ajfSuibXiXj0liMht9Ay9g37exw==';

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
