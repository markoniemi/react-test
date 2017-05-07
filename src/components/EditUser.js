import React from 'react';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import {editUser, removeUser} from '../actions/UserActions';
import store from '../stores/Store';

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.state = {
      username: this.props.user.username || '',
      email: this.props.user.email || '',
      index: this.props.user.index || 0
    };
  }

  render() {
    return this.renderUser();
  }

  renderUser() {
    return (
      <div>
        <form>
          <FormControl type="text" bsSize="small"
                       autoFocus
                       defaultValue={this.props.user.username} ref="username" onChange={this.handleChangeUsername}/>
          <FormControl type="text" bsSize="small"
                       defaultValue={this.props.user.email} ref="email" onKeyPress={this.checkEnter}
                       onChange={this.handleChangeEmail}/>
          <Button bsSize="small" className="pull-right" onClick={this.finishEdit}>
            <Glyphicon glyph="glyphicon glyphicon-ok"/>
          </Button>
        </form>
      </div>
    );
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

  finishEdit() {
    // TODO change index to id
    var user = {username: this.state.username, email: this.state.email, index: this.state.index};
    store.dispatch(editUser(user.index, user));
    browserHistory.push('/');
  }
}

EditUser.propTypes = {
  user: React.PropTypes.object
};
