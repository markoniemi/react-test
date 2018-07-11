import * as Debug from "debug";
import * as React from "react";
import {Alert} from "react-bootstrap";
import {connect} from "react-redux";
import Notification from "../domain/Notification";
import {IRootState} from "../stores/Store";

export interface INotificationsContainer {
  notifications?: ReadonlyArray<Notification>;
}

// TODO move this to class
const debug: Debug.IDebugger = Debug("NotificationsContainer");

class NotificationsContainer extends React.Component<INotificationsContainer, any> {
  constructor(props: INotificationsContainer) {
    super(props);
  }

  public async componentDidMount(): Promise<void> {
    debug("NotificationsContainer.componentDidMount");
  }

  public render(): JSX.Element {
    if (this.props.notifications != null && this.props.notifications.length > 0) {
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
      <Alert bsStyle="danger" key={notification._id}>{notification.message}</Alert>
    );
  }

  public static mapStateToProps(state: IRootState): INotificationsContainer {
    debug("NotificationsContainer.mapStateToProps");
    return {notifications: state.notifications};
  }
}

export default connect(NotificationsContainer.mapStateToProps)(NotificationsContainer);
