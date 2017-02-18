import React from 'react';
import User from './User';
import {Table} from 'react-bootstrap';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
  }

  render() {
        // {this.props.users.map(this.renderUser)}
    return (
      <Table>
        <tbody>
        </tbody>
      </Table>);
  }

  renderUser(user) {
    // TODO change key to user.id
    return (
      <User user={user} key={user.index}
            onEdit={this.props.onEdit.bind(null, user)}
            onDelete={this.props.onDelete.bind(null, user.id)}/>
    );
  }
}
