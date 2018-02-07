import * as React from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon} from "react-bootstrap";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store from "../stores/Store";
import {FormattedMessage} from "react-intl";

export interface IEditUser {
  user: User;
}

export default class EditUser extends React.Component<IEditUser, Partial<User>> {
  constructor(props: IEditUser) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
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
            <Col sm={5}>
              <Button id="saveUser" bsSize="small" className="pull-right" onClick={this.finishEdit}>
                <Glyphicon glyph="glyphicon glyphicon-ok"/>
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  // TODO find type for event
  private onChangeUsername(event: any): void {
    this.setState({
      username: event.target.value,
    });
  }

  private onChangeEmail(event: any): void {
    this.setState({
      email: event.target.value,
    });
  }

  private onKeyPress(event: any): void {
    if ("Enter" === event.key) {
      this.finishEdit();
    }
  }

  private finishEdit(): void {
    // TODO find a better way to map from Partial to strict
    const user: User = {
      _id: this.state._id,
      email: this.state.email,
      index: this.state.index,
      username: this.state.username,
    };
    if (this.state._id) {
      store.dispatch(UserActions.editUser(user));
    } else {
      store.dispatch(UserActions.addUser(user));
    }
  }
}
