import * as React from "react";
import {Button, FormControl, Glyphicon} from "react-bootstrap";
import {browserHistory} from "react-router";
import UserActions from "../actions/UserActions";
import User from "../domain/User";
import store from "../stores/Store";

export interface IUserRow {
  user: User;
}

export interface IUserRowState extends User {
  editing: boolean;
}

export default class UserRow extends React.Component<IUserRow, Partial<IUserRowState>> {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.edit = this.edit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.state = {...this.props.user, editing: false};
  }

  public render(): JSX.Element {
    return (this.state.editing ? this.renderEdit() : this.renderUser());
  }

  private renderUser(): JSX.Element {
    const user = this.props.user;
    return (
      <tr>
        <td ref="username" onClick={this.edit}>{user.username}</td>
        <td ref="email" onClick={this.edit}>{user.email}</td>
        <td>
          <Button bsSize="small" onClick={this.editUser}>
            <Glyphicon glyph="glyphicon glyphicon-edit"/>
          </Button>
          <Button bsSize="small" onClick={this.deleteUser}>
            <Glyphicon glyph="glyphicon glyphicon-remove"/>
          </Button>
        </td>
      </tr>
    );
  }

  private renderEdit(): JSX.Element {
    return (
      <tr>
        <td>
          <FormControl
            type="text"
            bsSize="small"
            autoFocus={true}
            defaultValue={this.props.user.username}
            ref="username"
            onChange={this.onChangeUsername}
          />
        </td>
        <td>
          <FormControl
            type="text"
            bsSize="small"
            defaultValue={this.props.user.email}
            ref="email"
            onKeyPress={this.onKeyPress}
            onChange={this.onChangeEmail}
          />
        </td>
        <td>
          <Button bsSize="small" className="pull-right" onClick={this.finishEdit}>
            <Glyphicon glyph="glyphicon glyphicon-ok"/>
          </Button>
        </td>
      </tr>
    );
  }

  private edit() {
    this.setState({
      editing: true,
    });
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

  private onKeyPress(event) {
    if ("Enter" === event.key) {
      this.finishEdit();
    }
  }

  private finishEdit() {
    const user: User = {
      _id: this.state._id,
      email: this.state.email,
      index: this.state.index,
      username: this.state.username,
    };
    this.setState({
      editing: false,
    });
    store.dispatch(UserActions.editUser(user));
  }

  private deleteUser() {
    store.dispatch(UserActions.removeUser(this.props.user));
  }

  private editUser() {
    browserHistory.push("/users/" + this.props.user._id);
  }
}
