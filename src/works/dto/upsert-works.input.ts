import { IsNotEmpty } from 'class-validator';

export class UpsertWorksInput {
  id: string;
  @IsNotEmpty()
  chatId: string;
  selectedChatsId: number;
  listenChannelUsernames: string[];
  listenWords: string[];
  muteChannelUsernames: string[];
  muteUsernames: string[];
  muteWords: string[];

  constructor(data: Partial<UpsertWorksInput>) {
    Object.assign(this, data);
  }
}
