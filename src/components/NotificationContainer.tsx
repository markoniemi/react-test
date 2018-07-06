import * as React from "react";
import {connect} from "react-redux";
import {RouterState} from "react-router";
import User from "../domain/User";
import {INotificationState} from "../reducers/NotificationReducer";
import {IRootState} from "../stores/Store";
import EditUser from "./EditUser";

export interface INotificationContainer extends INotificationState {
}

export class NotificationContainer extends React.Component<INotificationContainer, any> {
  public constructor(props: INotificationContainer) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <p>{this.props.notifications.toString()}</p>
    );
  }

  public static mapStateToProps(state: IRootState, props: RouterState): INotificationContainer {
    return state.notifications;
  }

  private static findUserById(users: ReadonlyArray<User>, id: string): User {
    return users.find((user: User): boolean => user._id === id);
  }
}

export default connect(NotificationContainer.mapStateToProps)(NotificationContainer);
