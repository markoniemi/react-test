export enum NotificationType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  RESET = "RESET",
}

export default class Notification {
  public message: string;
  public type: NotificationType;
}