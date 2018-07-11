import * as React from "react";
import {Button, Table} from "react-bootstrap";
import Notification from "../domain/Notification";
import NotificationRow from "./NotificationRow";

interface INotifications {
  notifications: ReadonlyArray<Notification>;
}

export default class Notifications extends React.Component<INotifications, any> {
  constructor(props: INotifications) {
    super(props);
    this.renderNotification = this.renderNotification.bind(this);
  }

  public render(): JSX.Element {
    if (this.props.notifications) {
      return (
        <Table>
          <tbody>
          {this.props.notifications.map(this.renderNotification)}
          </tbody>
        </Table>);
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
