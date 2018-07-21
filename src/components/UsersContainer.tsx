import * as Debug from "debug";
import * as React from "react";
import {Button, Glyphicon, Nav, Navbar, NavItem, Panel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {hashHistory, RouterState} from "react-router";
import {Dispatch} from "redux";
import LoginActions from "../actions/LoginActions";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store, {IRootState} from "../stores/Store";
import {IUserContainer, IUserContainerActions, UserContainer} from "./UserContainer";
import Users from "./Users";

export interface IUsersContainer {
  users: ReadonlyArray<User>;
}

export interface IUsersContainerActions {
  newUser?: () => void;
  logout?: () => void;
  deleteUser?: (user: User) => void;
  editUser?: (user: User) => void;
  saveUser?: (user: User) => void;
}

// TODO move this to class
const debug: Debug.IDebugger = Debug("UsersContainer");

export class UsersContainer extends React.Component<IUsersContainer & IUsersContainerActions, RouterState> {
  constructor(props: IUsersContainer) {
    super(props);
  }

  public async componentDidMount(): Promise<void> {
    if (0 === this.props.users.length) {
      await store.dispatch(UserActions.fetchUsers());
    }
  }

  // move NavBar to App?
  public render(): JSX.Element {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">react-test</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem ref="/users"><FormattedMessage id="users"/></NavItem>
          </Nav>
          <Navbar.Form>
            <Button id="logout" bsStyle="primary" onClick={this.props.logout}>
              <Glyphicon glyph="glyphicon glyphicon-log-out"/>
            </Button>
          </Navbar.Form>
        </Navbar>
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

  public static async logout(): Promise<void> {
    debug("logout");
    await store.dispatch(LoginActions.logout());
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
      logout: UsersContainer.logout,
      deleteUser: UsersContainer.deleteUser,
      editUser: UsersContainer.editUser,
      saveUser: UsersContainer.saveUser,
    };
  }
}

export default connect<IUsersContainer & IUsersContainerActions, any, RouterState>
(UsersContainer.mapStateToProps, UsersContainer.mapDispatchToProps)
(UsersContainer);
