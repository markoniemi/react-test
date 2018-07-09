import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import {IRootState} from "../stores/Store";
import Notification from "../domain/Notification";

export interface INotificationActionPayload {
  notification: Notification;
}

export interface INotificationAction extends Action<INotificationActionPayload> {
  type: NotificationActionType;
  message: string;
}

export interface INotificationAction extends Action<INotificationActionPayload> {
  type: NotificationActionType;
}

export enum NotificationActionType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  RESET = "RESET",
  RESET_NOTIFICATION = "RESET_NOTIFICATION",
  RESET_NOTIFICATIONS = "RESET_NOTIFICATIONS",
}

export default class NotificationActions {
  public static info(message: string): ThunkAction<Promise<INotificationAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<INotificationAction> => {
      return dispatch({
        type: NotificationActionType.INFO,
        message,
      });
    };
  }
  // TODO add missing actions
}
