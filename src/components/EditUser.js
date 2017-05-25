import React from 'react';
import {Form, FormGroup, Col, Label, FormControl, Button, Glyphicon} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {editUser, removeUser} from '../actions/UserActions';
import store from '../stores/Store';

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
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
        <Form horizontal>
          <FormGroup>
            <Col sm={1}>
              <Label for="username">Username:</Label>
            </Col>
            <Col sm={4}>
              <FormControl type="text" bsSize="small"
                           autoFocus
                           defaultValue={this.props.user.username} ref="username" onChange={this.onChangeUsername}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={1}>
              <Label for="email">Email:</Label>
            </Col>
            <Col sm={4}>
              <FormControl type="text" bsSize="small"
                           defaultValue={this.props.user.email} ref="email" onKeyPress={this.onKeyPress}
                           onChange={this.onChangeEmail}/>
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
    var user = {username: this.state.username, email: this.state.email, index: this.state.index};
    store.dispatch(editUser(user.index, user));
    browserHistory.push('/');
  }
}

EditUser.propTypes = {
  user: React.PropTypes.object
};
