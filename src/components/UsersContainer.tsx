import * as React from "react";
import {connect} from "react-redux";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store from "../stores/Store";
import Users from "./Users";

interface IUsersContainer {
  users: User[];
}
export class UsersContainer extends React.Component<IUsersContainer, any> {
  public static mapStateToProps(state, props) {
    return {users: state.users};
  }

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.users.length === 0) {
      store.dispatch(UserActions.fetchUsers());
    }
  }

  public render() {
    return (
      <Users users={this.props.users}/>
    );
  }
}

export default connect(UsersContainer.mapStateToProps)(UsersContainer);
