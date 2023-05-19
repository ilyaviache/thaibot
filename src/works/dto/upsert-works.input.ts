import { IsNotEmpty } from 'class-validator';

export class UpsertWorksInput {
  id: string;
  @IsNotEmpty()
  chatId: string;
  listenChatUsernames: string[];
  listenWords: string[];
  muteChatUsernames: any[];
  muteWords: any[];

  constructor(data: Partial<UpsertWorksInput>) {
    Object.assign(this, data);
  }
}
