import * as React from "react";
import {Button, Glyphicon, Panel} from "react-bootstrap";
import {Provider} from "react-redux";
import {browserHistory} from "react-router";
import store from "../stores/Store";
import UsersContainer from "./UsersContainer";

export default class App extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Panel header="Users">
          <UsersContainer/>
          <Button id="addUser" bsStyle="primary" onClick={this.newUser}>
            <Glyphicon glyph="glyphicon glyphicon-plus"/>
          </Button>
        </Panel>
      </Provider>
    );
  }

  private newUser() {
    browserHistory.push("/users/new");
  }
}
