import React from 'react';
import User from './User.js';
import { Table } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { ListGroupItem } from 'react-bootstrap';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
  }
  render() {
    const users = this.props.items;

    return (
    <Table>
      <tbody>
      {users.map(this.renderUser)}
      </tbody>
    </Table>);
  }
  renderUser(user) {
    // TODO change to user
//    onEdit={this.props.onEdit.bind(null, user.id)}
//     <ListGroupItem key={user.id}>
    return (
        <User user={user}
        onEdit={this.props.onEdit.bind(null, user)}
        onDelete={this.props.onDelete.bind(null, user.id)}/>
    );
  }
}