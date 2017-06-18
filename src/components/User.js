import React from 'react';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {editUser, removeUser} from '../actions/UserActions';
import store from '../stores/Store';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';

export default class User extends React.Component {
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
    this.state = {
      editing: false,
      _id: this.props.user._id || '',
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

  renderEdit() {
    return (
      <tr>
        <td>
          <FormControl type="text" bsSize="small"
                       autoFocus
                       defaultValue={this.props.user.username} ref="username" onChange={this.onChangeUsername}/>
        </td>
        <td>
          <FormControl type="text" bsSize="small"
                       defaultValue={this.props.user.email} ref="email" onKeyPress={this.onKeyPress}
                       onChange={this.onChangeEmail}/>
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

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onChangeEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.finishEdit();
    }
  }

  finishEdit() {
    // TODO change index to id
    var user = {username: this.state.username, email: this.state.email, index: this.state.index, _id: this.state._id};
    this.setState({
      editing: false
    });
    store.dispatch(editUser(user));
  }

  deleteUser() {
    store.dispatch(removeUser(this.props.user));
  }

  editUser() {
    browserHistory.push('/users/' + this.props.user._id);
  }
}
User.propTypes = {
  user: React.PropTypes.object
};
