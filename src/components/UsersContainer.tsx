import * as Debug from "debug";
import * as React from "react";
import {Button, Glyphicon, Panel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {hashHistory, RouterState} from "react-router";
import {Dispatch} from "redux";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store, {IRootState} from "../stores/Store";
import Menu from "./Menu";
import Users from "./Users";

export interface IUsersContainer {
  users: ReadonlyArray<User>;
}

export interface IUsersContainerActions {
  newUser?: () => void;
  deleteUser?: (user: User) => void;
  editUser?: (user: User) => void;
  saveUser?: (user: User) => void;
}

export class UsersContainer extends React.Component<IUsersContainer & IUsersContainerActions, RouterState> {
  private static readonly debug: Debug.IDebugger = Debug("UsersContainer");

  constructor(props: IUsersContainer) {
    super(props);
  }

  public async componentDidMount(): Promise<void> {
    if (0 === this.props.users.length) {
      await store.dispatch(UserActions.fetchUsers());
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <Menu/>
        <Panel>
          <Panel.Heading><FormattedMessage id="users"/></Panel.Heading>
          <Panel.Body>
            <Users
              users={this.props.users}
              deleteUser={this.props.deleteUser}
              saveUser={this.props.saveUser}
              editUser={this.props.editUser}
            />
            <Button id="addUser" bsStyle="primary" onClick={this.props.newUser}>
              <Glyphicon glyph="glyphicon glyphicon-plus"/>
            </Button>
          </Panel.Body>
        </Panel>
      </div>
    );
  }

  public static newUser(): void {
    hashHistory.push("/users/new");
  }

  public static async deleteUser(user: User): Promise<void> {
    await store.dispatch(UserActions.removeUser(user));
  }

  public static async saveUser(user: User): Promise<void> {
    await store.dispatch(UserActions.editUser(user));
  }

  public static async editUser(user: User): Promise<void> {
    hashHistory.push("/users/" + user._id);
  }

  public static mapStateToProps(state: IRootState): IUsersContainer {
    return {users: state.users};
  }

  public static mapDispatchToProps(dispatch: Dispatch<IUsersContainerActions>): IUsersContainerActions {
    return {
      newUser: UsersContainer.newUser,
      deleteUser: UsersContainer.deleteUser,
      editUser: UsersContainer.editUser,
      saveUser: UsersContainer.saveUser,
    };
  }
}

export default connect<IUsersContainer & IUsersContainerActions, any, RouterState>
(UsersContainer.mapStateToProps, UsersContainer.mapDispatchToProps)
(UsersContainer);
