import * as React from "react";
import {connect} from "react-redux";
import {RouterState} from "react-router";
import User from "../domain/User";
import {IRootState} from "../stores/Store";
import EditUser from "./EditUser";

interface IUserContainer {
  user: User;
}

export class UserContainer extends React.Component<IUserContainer, any> {
  public static mapStateToProps(state: IRootState, props: RouterState): IUserContainer {
    let user: User = new User();
    const userId = props.params.id;
    if (0 < state.users.length && userId) {
      user = UserContainer.findUserById(state.users, userId);
    }
    return {user};
  }

  private static findUserById(users: User[], id: string): User {
    return users.find((user: User): boolean => user._id === id);
  }

  constructor(props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <EditUser user={this.props.user}/>
    );
  }
}

export default connect(UserContainer.mapStateToProps)(UserContainer);
