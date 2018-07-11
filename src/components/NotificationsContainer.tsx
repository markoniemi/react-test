import * as Debug from "debug";
import * as React from "react";
import {Panel} from "react-bootstrap";
import {connect} from "react-redux";
import UserActions from "../actions/UserActions";
import Notification from "../domain/Notification";
import store from "../stores/Store";
import {IRootState} from "../stores/Store";
import Notifications from "./Notifications";

export interface INotificationsContainer {
  notifications?: ReadonlyArray<Notification>;
}

// TODO move this to class
const debug: Debug.IDebugger = Debug("NotificationsContainer");
export class NotificationsContainer extends React.Component<INotificationsContainer, any> {
  constructor(props: INotificationsContainer) {
    super(props);
  }

  public async componentDidMount(): Promise<void> {
    debug("NotificationsContainer.componentDidMount");
  }

  public render(): JSX.Element {
    return (
      <div>
        <Panel>
          <Panel.Body>
            <Notifications notifications={this.props.notifications}/>
          </Panel.Body>
        </Panel>
      </div>
    );
  }

  public static mapStateToProps(state: IRootState): INotificationsContainer {
    debug("NotificationsContainer.mapStateToProps");
    return {notifications: state.notifications};
  }
}

export default connect(NotificationsContainer.mapStateToProps)(NotificationsContainer);
