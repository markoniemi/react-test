import * as React from "react";
import {connect} from "react-redux";
import User from "../domain/User";
import EditUser from "./EditUser";

interface IUserContainer {
  user: User;
}

export class UserContainer extends React.Component<IUserContainer, any> {
// Which part of the Redux global state does our component want to receive as props?
// TODO add argument types
  public static mapStateToProps(state, props) {
    let user = {username: "", email: ""};
    const userId = props.params.id;
    if (state.users.length > 0 && userId) {
      user = UserContainer.findUserById(state.users, userId);
    }
    return {user};
  }

  private static findUserById(users, id) {
    const foundUser = users.find((user) => {
      return user._id === id;
    });
    return foundUser;
  }

  constructor(props) {
    super(props);
  }

  public render() {
    return (
      <EditUser user={this.props.user}/>
    );
  }
}

export default connect(UserContainer.mapStateToProps)(UserContainer);
