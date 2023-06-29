export class WorkDTO {
  id: string;
  chatId: string;
  selectedChatsId: number;
  listenChannelUsernames: string[];
  listenWords: string[];
  muteChannelUsernames: string[];
  muteUsernames: string[];
  muteWords: string[];
  updatedAt: Date;
  createdAt: Date;
}
