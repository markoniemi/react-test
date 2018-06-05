import * as Debug from "debug";
import * as React from "react";
import {Button, Glyphicon, Nav, Navbar, NavItem, Panel} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {hashHistory} from "react-router";
import LoginActions from "../actions/LoginActions";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store, {IRootState} from "../stores/Store";
import Users from "./Users";

export interface IUsersContainer {
  users: ReadonlyArray<User>;
}
// TODO move this to class
const debug: Debug.IDebugger = Debug("UsersContainer");
export class UsersContainer extends React.Component<IUsersContainer, any> {
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
          <Button id="logout" bsStyle="primary" onClick={this.logout}>
            <Glyphicon glyph="glyphicon glyphicon-log-out"/>
          </Button>
        </Navbar.Form>
      </Navbar>
      <Panel>
        <Panel.Heading><FormattedMessage id="users"/></Panel.Heading>
        <Panel.Body>
          <Users users={this.props.users}/>
          <Button id="addUser" bsStyle="primary" onClick={this.newUser}>
            <Glyphicon glyph="glyphicon glyphicon-plus"/>
          </Button>
        </Panel.Body>
      </Panel>
      </div>
    );
  }

  private newUser(): void {
    hashHistory.push("/users/new");
  }
  private async logout(): Promise<void> {
    debug("logout");
    await store.dispatch(LoginActions.logout());
  }

  public static mapStateToProps(state: IRootState): IUsersContainer {
    return {users: state.users};
  }

}

export default connect(UsersContainer.mapStateToProps)(UsersContainer);
