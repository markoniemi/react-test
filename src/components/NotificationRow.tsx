import * as React from "react";
import {Alert} from "react-bootstrap";
import Notification from "../domain/Notification";

export interface INotificationRow {
  notification: Notification;
}

export default class NotificationRow extends React.Component<INotificationRow, any> {
  constructor(props: INotificationRow) {
    super(props);
  }

  public render(): JSX.Element {
    const notification: Notification = this.props.notification;
    return (
      <Alert bsStyle="danger">{notification.message}</Alert>
    );
  }
}
