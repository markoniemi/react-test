import * as Debug from "debug";
import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import {INotificationState} from "../reducers/NotificationReducer";
import {default as store, IRootState} from "../stores/Store";
import {IUserAction} from "./UserActions";

export interface INotificationAction extends Action<INotificationState> {
  type: NotificationActionType;
  message: string;
}

export enum NotificationActionType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  RESET = "RESET",
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
}
