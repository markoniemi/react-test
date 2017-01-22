import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import store from '../stores/Store';

const UsersContainer = React.createClass({

  componentDidMount: function() {
    // userApi.getUsers();
    // store.dispatch(loadSearchLayout('users', 'User Results'));
  },

  render: function() {
    return (
      <Users users={this.props.users} />
    );
  }

});

const mapStateToProps = function(store) {
  return {
    users: store.users
  };
};

export default connect(mapStateToProps)(UsersContainer);