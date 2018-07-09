import * as Debug from "debug";
import {browserHistory} from "react-router";
import {INotificationAction, NotificationActionType} from "../actions/NotificationActions";
import Notification from "../domain/Notification";

const debug: Debug.IDebugger = Debug("NotificationsReducer");
export default (state: ReadonlyArray<Notification> = [], action: INotificationAction): ReadonlyArray<Notification> => {
  switch (action.type) {
    case NotificationActionType.ERROR:
      return addNotification(state, action);
    case NotificationActionType.RESET_NOTIFICATION:
      return resetNotification(state, action);
    case NotificationActionType.RESET_NOTIFICATIONS:
      return resetNotifications(state, action);
  }
  return state;
};

function addNotification(state: ReadonlyArray<Notification>, action: INotificationAction) {
  debug("ADD_USER_SUCCESS: %s", action.payload.user.username);
  return [...state.filter((user: Notification) => {
    return user._id !== action.payload.user._id;
  }), {...action.payload.user}];
}

function resetNotification(state: ReadonlyArray<Notification>, action: INotificationAction) {
  debug("REMOVE_USER_SUCCESS: %s", action.payload.user._id);
  return [...state.filter((user: Notification) => {
    return user._id !== action.payload.user._id;
  })];
}

function resetNotifications(state: ReadonlyArray<Notification>, action: INotificationAction) {
  return [];
}
