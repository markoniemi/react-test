import * as Debug from "debug";
import * as React from "react";
import {Button, Glyphicon, Nav, Navbar, NavItem} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import {RouterState} from "react-router";
import LoginActions from "../actions/LoginActions";
import store from "../stores/Store";

export default class Menu extends React.Component<{}, RouterState> {
  private static readonly debug: Debug.IDebugger = Debug("Menu");

  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
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
          <Button className="pull-right" id="logout" bsStyle="primary" onClick={Menu.logout}>
            <Glyphicon glyph="glyphicon glyphicon-log-out"/>
          </Button>
        </Navbar.Form>
      </Navbar>
    );
  }

  public static async logout(): Promise<void> {
    Menu.debug("logout");
    await store.dispatch(LoginActions.logout());
  }
}
