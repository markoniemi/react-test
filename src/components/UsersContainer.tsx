import * as React from "react";
import {connect} from "react-redux";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store, {IRootState} from "../stores/Store";
import Users from "./Users";

interface IUsersContainer {
  users: User[];
}
export class UsersContainer extends React.Component<IUsersContainer, any> {
  public static mapStateToProps(state: IRootState): IUsersContainer {
    return {users: state.users};
  }

  constructor(props: IUsersContainer) {
    super(props);
  }

  public componentDidMount(): void {
    if (0 === this.props.users.length) {
      store.dispatch(UserActions.fetchUsers());
    }
  }

  public render(): JSX.Element {
    return (
      <Users users={this.props.users}/>
    );
  }
}

export default connect(UsersContainer.mapStateToProps)(UsersContainer);
