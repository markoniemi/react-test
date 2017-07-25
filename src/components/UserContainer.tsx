import * as React from "react";
import {connect} from "react-redux";
import User from "../domain/User";
import EditUser from "./EditUser";
import {RouterState} from "react-router";
import {IRootState} from "../stores/Store";

interface IUserContainer {
  user: User;
}

export class UserContainer extends React.Component<IUserContainer, any> {
// Which part of the Redux global state does our component want to receive as props?
// TODO add argument types
  public static mapStateToProps(state: IRootState, props: RouterState): IUserContainer {
    let user: User = new User();
    const userId = props.params.id;
    if (0 < state.users.length && userId) {
      user = UserContainer.findUserById(state.users, userId);
    }
    return {user};
  }

  private static findUserById(users: User[], id: string) {
    const foundUser: User = users.find((user: User): boolean => {
      return user._id === id;
    });
    return foundUser;
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
