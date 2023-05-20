export class NewMessageDataDTO {
  text: string;

  constructor(params) {
    Object.assign(this, params);
  }
}
