export enum MessageType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export default class Message {
  public id?: string;
  public text: string;
  public type: MessageType;

  constructor() {
    this.id = "";
    this.text = "";
    this.type = null;
  }
}
