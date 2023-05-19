export class WorkDTO {
  id: string;
  chatId: string;
  listenChatUsernames: string[];
  listenWords: string[];
  muteChatUsernames: any[];
  muteWords: any[];
  updatedAt: Date;
  createdAt: Date;
}
