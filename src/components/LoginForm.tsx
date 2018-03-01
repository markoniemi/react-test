import * as React from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon, Grid, Panel, Row} from "react-bootstrap";
import {AppContainer} from "react-hot-loader";
import {FormattedMessage} from "react-intl";
import LoginActions from "../actions/LoginActions";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store from "../stores/Store";

export interface ILoginForm {
  username: string;
  password: string;
}

export default class LoginForm extends React.Component<{}, ILoginForm> {
  constructor(props: any) {
    super(props);
    this.login = this.login.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  public render(): JSX.Element {
    return (
      <Grid>
        <Row>
          <Col sm={1} md={4} mdOffset={4}>
            <Panel>
              <Panel.Heading><FormattedMessage id="login"/></Panel.Heading>
              <Panel.Body>
                <Form horizontal={true}>
                  <FormGroup>
                    <Col sm={4}>
                      <ControlLabel><FormattedMessage id="username"/>:</ControlLabel>
                    </Col>
                    <Col sm={4}>
                      <FormControl
                        id="username"
                        type="text"
                        bsSize="small"
                        autoFocus={true}
                        ref="username"
                        onChange={this.onChangeUsername}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm={4}>
                      <ControlLabel><FormattedMessage id="password"/>:</ControlLabel>
                    </Col>
                    <Col sm={4}>
                      <FormControl
                        id="password"
                        type="text"
                        bsSize="small"
                        ref="password"
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangePassword}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm={5}>
                      <Button id="login" bsSize="small" className="pull-right" onClick={this.login}>
                        <Glyphicon glyph="glyphicon glyphicon-ok"/>
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Panel.Body>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }

  private onChangeUsername(event: React.ChangeEvent<any>): void {
    this.setState({
      username: event.target.value,
    });
  }

  private onChangePassword(event: React.ChangeEvent<any>): void {
    this.setState({
      password: event.target.value,
    });
  }

  private onKeyPress(event: React.KeyboardEvent<FormControl>): void {
    if ("Enter" === event.key) {
      this.login();
    }
  }

  private login(): void {
    const loginForm: ILoginForm = {
      password: this.state.password,
      username: this.state.username,
    }
    store.dispatch(LoginActions.login(loginForm));
  }
}
