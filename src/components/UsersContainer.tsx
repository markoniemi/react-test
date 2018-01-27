import * as React from "react";
import * as Button from "react-bootstrap/lib/Button";
import * as Glyphicon from "react-bootstrap/lib/Glyphicon";
import * as Panel from "react-bootstrap/lib/Panel";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store, {IRootState} from "../stores/Store";
import Users from "./Users";

export interface IUsersContainer {
  users: User[];
}

export class UsersContainer extends React.Component<IUsersContainer, any> {
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
      <Panel header="Users">
        <Users users={this.props.users}/>
        <Button id="addUser" bsStyle="primary" onClick={this.newUser}>
          <Glyphicon glyph="glyphicon glyphicon-plus"/>
        </Button>
      </Panel>
    );
  }
  private newUser(): void {
    browserHistory.push("/users/new");
  }

  public static mapStateToProps(state: IRootState): IUsersContainer {
    return {users: state.users};
  }

}

export default connect(UsersContainer.mapStateToProps)(UsersContainer);
