export class NewMessageDataDTO {
  text: string;
  fromUsername: string;
  chatUsername: string;

  constructor(params) {
    Object.assign(this, params);
  }
}
