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

function addNotification(state: ReadonlyArray<Notification>, action: INotificationAction): ReadonlyArray<Notification> {
  debug("addNotification: %s", action.payload.notification.type);
  return [...state, action.payload.notification];
}

function resetNotification(state: ReadonlyArray<Notification>, action: INotificationAction): ReadonlyArray<Notification> {
  // TODO reset notification
  debug("resetNotification: %s", action.payload.id);
  return state.map((notification) => {
    if (notification._id !== action.payload.id) {
      return notification;
    }
  });
}

function resetNotifications(state: ReadonlyArray<Notification>, action: INotificationAction) {
  return [];
}
