import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import Notification, {NotificationType} from "../domain/Notification";
import {IRootState} from "../stores/Store";
import {UserActionType} from "./UserActions";

// TODO is there a better way to do this?
export interface INotificationActionPayload {
  notification?: Notification;
  id?: string;
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
  private static id = 0;

  public static error(message: string): ThunkAction<Promise<INotificationAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<INotificationAction> => {
      this.id++;
      return dispatch({
        type: NotificationActionType.ERROR,
        payload: {notification: {_id: this.id.toString(), type: NotificationType.ERROR, message: message}},
      });
    };
  }

  // TODO add missing actions
  public static resetNotification(id: string): INotificationAction {
    return {
      type: NotificationActionType.RESET_NOTIFICATION,
      payload: {id: id},
    };
  }

  public static resetNotifications(): INotificationAction {
    return {
      type: NotificationActionType.RESET_NOTIFICATIONS,
    };
  }
}
