export enum MessageType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export default class Message {
  public _id?: string;
  public text: string;
  public type: MessageType;

  constructor() {
    this._id = "";
    this.text = "";
    this.type = null;
  }
}
