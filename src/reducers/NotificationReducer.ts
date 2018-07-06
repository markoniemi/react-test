import * as Debug from "debug";
import {browserHistory} from "react-router";
import {INotificationAction, NotificationActionType} from "../actions/NotificationActions";
import {UserActionType} from "../actions/UserActions";
import User from "../domain/User";

export interface INotificationState {
  type: NotificationActionType;
  message: string;
}

const initialState: INotificationState = null;
const debug: Debug.IDebugger = Debug("NotificationReducer");
export default (state: Readonly<INotificationState> = initialState, action: INotificationAction): Readonly<INotificationState> => {
  switch (action.type) {
    case NotificationActionType.INFO:
      return {type: action.type, message: action.message};
    default:
      return state;
  }
};
