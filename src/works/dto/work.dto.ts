export class WorkDTO {
  id: string;
  chatId: string;
  listenChatUsernames: string[];
  listenWords: string[];
  muteUsernames: any[];
  muteWords: any[];
  updatedAt: Date;
  createdAt: Date;
}
