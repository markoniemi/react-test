import React from 'react';
import User from './User';
import { Table } from 'react-bootstrap';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
    this.users = props.users;
  }
  render() {
    return (
    <Table>
      <tbody>
      {this.users.map(this.renderUser)}
      </tbody>
    </Table>);
  }
  renderUser(user) {
    return (
        <User user={user}
        onEdit={this.props.onEdit.bind(null, user)}
        onDelete={this.props.onDelete.bind(null, user.id)}/>
    );
  }
}