export class NewMessageDataDTO {
  messageId: number;
  text: string;
  fromUsername: string;
  channelUsername: string;
  channelName: string;

  constructor(params) {
    Object.assign(this, params);
  }
}
