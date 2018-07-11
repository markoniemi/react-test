import * as Debug from "debug";
import * as React from "react";
import {Table} from "react-bootstrap";
import * as Panel from "react-bootstrap/lib/Panel";
import Notification from "../domain/Notification";
import NotificationRow from "./NotificationRow";

interface INotifications {
  notifications: ReadonlyArray<Notification>;
}

const debug: Debug.IDebugger = Debug("Notifications");
export default class Notifications extends React.Component<INotifications, any> {
  constructor(props: INotifications) {
    super(props);
    this.renderNotification = this.renderNotification.bind(this);
  }

  public render(): JSX.Element {
    if (this.props.notifications) {
      debug("render");
      return (
        <div>
                {this.props.notifications.map(this.renderNotification)}
        </div>
      );
    } else {
      return null;
    }
  }

  private renderNotification(notification: Notification): JSX.Element {
    return (
      <NotificationRow notification={notification} key={notification._id}/>
    );
  }
}
