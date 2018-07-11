export enum NotificationType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  RESET = "RESET",
}

export default class Notification {
  public _id?: string;
  public message: string;
  public type: NotificationType;

  constructor() {
    this._id = "";
    this.message = "";
    this.type = null;
  }
}
