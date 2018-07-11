import * as React from "react";
import NotificationActions from "../actions/NotificationActions";
import Notification from "../domain/Notification";
import store from "../stores/Store";
import {Button, FormControl, Glyphicon} from "react-bootstrap";

export interface INotificationRow {
  notification: Notification;
}

export default class NotificationRow extends React.Component<INotificationRow, any> {
  constructor(props: INotificationRow) {
    super(props);
    this.resetNotification = this.resetNotification.bind(this);
  }
  public render(): JSX.Element {
    const notification: Notification = this.props.notification;
    return (
      <tr>
        <td id="type" ref="type">{notification.type}</td>
        <td id="message" ref="message">{notification.message}</td>
        <td>
          <Button id="resetNotification" bsSize="small" onClick={this.resetNotification}>
            <Glyphicon glyph="glyphicon glyphicon-remove"/>
          </Button>
        </td>
      </tr>
    );
  }

  private async resetNotification(): Promise<void> {
    await store.dispatch(NotificationActions.resetNotification(this.props.notification._id));
  }
}
