import React from 'react';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {editUser, removeUser} from '../actions/UserActions';
import store from '../stores/Store';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.edit = this.edit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderUser = this.renderUser.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      editing: false,
      username: this.props.user.username || '',
      email: this.props.user.email || '',
      index: this.props.user.index || 0
    };
  }

  render() {
    return (this.state.editing ? this.renderEdit() : this.renderUser());
  }

  renderUser() {
    const user = this.props.user;
    return (
      <tr>
        <td ref="username" onClick={this.edit}>{user.username}</td>
        <td ref="email" onClick={this.edit}>{user.email}</td>
        <td>
          <Button bsSize="small" className="pull-right" onClick={this.deleteUser}>
            <Glyphicon glyph="glyphicon glyphicon-remove"/>
          </Button>
        </td>
      </tr>
    );
  }

  renderEdit() {
    return (
      <tr>
        <td>
          <FormControl type="text" bsSize="small"
                       autoFocus
                       defaultValue={this.props.user.username} ref="username" onChange={this.handleChangeUsername}/>
        </td>
        <td>
          <FormControl type="text" bsSize="small"
                       defaultValue={this.props.user.email} ref="email" onKeyPress={this.checkEnter}
                       onChange={this.handleChangeEmail}/>
        </td>
        <td>
          <Button bsSize="small" className="pull-right" onClick={this.finishEdit}>
            <Glyphicon glyph="glyphicon glyphicon-ok"/>
          </Button>
        </td>
      </tr>
    );
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  checkEnter(e) {
    if (e.key === 'Enter') {
      this.finishEdit();
    }
  }

  finishEdit() {
    // TODO change index to id
    var user = {username: this.state.username, email: this.state.email, index: this.state.index};
    this.setState({
      editing: false
    });
    store.dispatch(editUser(user.index, user));
  }

  deleteUser() {
    store.dispatch(removeUser(this.props.user.index));
  }
}
User.propTypes = {
  user: React.PropTypes.object
};
