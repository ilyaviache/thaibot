export class WorkDTO {
  id: string;
  chatId: string;
  listenChannelUsernames: string[];
  listenWords: string[];
  muteChannelUsernames: string[];
  muteUsernames: string[];
  muteWords: string[];
  updatedAt: Date;
  createdAt: Date;
}
