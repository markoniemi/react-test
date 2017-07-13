import * as React from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Glyphicon} from "react-bootstrap";
import {addUser, editUser} from "../actions/UserActions";
import User from "../domain/User";
import store from "../stores/Store";

interface IEditUser {
  user: User;
}
// TODO define state interface
// TODO use User as state
export default class EditUser extends React.Component<IEditUser, any> {
  constructor(props: IEditUser) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.state = {
      _id: this.props.user._id,
      email: this.props.user.email || "",
      index: this.props.user.index || 0,
      username: this.props.user.username || "",
    };
  }

  public render() {
    return this.renderUser();
  }

  private renderUser() {
    return (
      <div>
        <Form horizontal={true}>
          <FormGroup>
            <Col sm={1}>
              <ControlLabel>Id:</ControlLabel>
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
              <ControlLabel>Username:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
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
              <ControlLabel>Email:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
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
              <Button bsSize="small" className="pull-right" onClick={this.finishEdit}>
                <Glyphicon glyph="glyphicon glyphicon-ok"/>
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }

  private onChangeUsername(event) {
    this.setState({
      username: event.target.value,
    });
  }

  private onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  private onKeyPress(e) {
    if (e.key === "Enter") {
      this.finishEdit();
    }
  }

  private finishEdit() {
    const user = {_id: this.state._id, username: this.state.username, email: this.state.email, index: this.state.index};
    if (user._id) {
      store.dispatch(editUser(user));
    } else {
      store.dispatch(addUser(user));
    }
  }
}
