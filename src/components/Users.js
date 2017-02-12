import React from 'react';
import User from './User';
import { Table } from 'react-bootstrap';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.renderUser = this.renderUser.bind(this);
  }
  render() {
    return (
    <Table>
      <tbody>
      {this.props.users.map(this.renderUser)}
      </tbody>
    </Table>);
  }
      // <tr key={user.username}>
      //   <td>{user.username}</td><td>{user.email}</td>
      // </tr>
  renderUser(user) {
    // change key to user.id
    return (
        <User user={user} key={user.index}
        onEdit={this.props.onEdit.bind(null, user)}
        onDelete={this.props.onDelete.bind(null, user.id)}/>
    );
  }
}