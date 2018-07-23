import * as React from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store from "../stores/Store";

export interface IEditUser {
  user: User;
}
export interface IEditUserActions {
  saveUser?: (user: User) => Promise<void>;
}

export default class EditUser extends React.Component<IEditUser & IEditUserActions, Partial<User>> {
  constructor(props: IEditUser & IEditUserActions) {
    super(props);
    this.saveUser = this.saveUser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = this.props.user;
  }

  public render(): JSX.Element {
    return (
      <div>
        <Form horizontal={true}>
          <FormGroup>
            <Col sm={1}>
              <ControlLabel><FormattedMessage id="id"/>:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                disabled={true}
                type="text"
                bsSize="small"
                autoFocus={true}
                defaultValue={this.props.user._id}
                ref="_id"
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={1}>
              <ControlLabel><FormattedMessage id="username"/>:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                id="username"
                type="text"
                bsSize="small"
                autoFocus={true}
                defaultValue={this.props.user.username}
                ref="username"
                onChange={this.onChangeUsername}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={1}>
              <ControlLabel><FormattedMessage id="email"/>:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                id="email"
                type="text"
                bsSize="small"
                defaultValue={this.props.user.email}
                ref="email"
                onKeyPress={this.onKeyPress}
                onChange={this.onChangeEmail}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={1}>
              <ControlLabel><FormattedMessage id="password"/>:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                id="password"
                type="password"
                bsSize="small"
                defaultValue={this.props.user.password}
                ref="password"
                onKeyPress={this.onKeyPress}
                onChange={this.onChangePassword}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={5}>
              <Button id="saveUser" bsSize="small" className="pull-right" onClick={this.saveUser}>
                <Glyphicon glyph="glyphicon glyphicon-ok"/>
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  private onChangeUsername(event: React.ChangeEvent<any>): void {
    this.setState({
      username: event.target.value,
    });
  }

  private onChangeEmail(event: React.ChangeEvent<any>): void {
    this.setState({
      email: event.target.value,
    });
  }
  private onChangePassword(event: React.ChangeEvent<any>): void {
    this.setState({
      password: event.target.value,
    });
  }

  private async onKeyPress(event: React.KeyboardEvent<FormControl>): Promise<void> {
    if ("Enter" === event.key) {
      await this.saveUser();
    }
  }

  private async saveUser(): Promise<void> {
    // TODO find a better way to map from Partial to strict
    const user: User = {
      _id: this.state._id,
      email: this.state.email,
      index: this.state.index,
      password: this.state.password,
      username: this.state.username,
    };
    await this.props.saveUser(user);
  }
}
