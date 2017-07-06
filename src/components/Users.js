import React from 'react';
import User from './User';
import {Table} from 'react-bootstrap';

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

  renderUser(user) {
    return (
      <User user={user} key={user._id}/>
    );
  }
}
Users.propTypes = {
  users: React.PropTypes.array
};
