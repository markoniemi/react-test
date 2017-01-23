import React from 'react';
import { connect } from 'react-redux';
import Users from './Users';
// import store from '../stores/Store';

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

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = function(store) {
  return {
    users: store.users
  };
};

// Which action creators does it want to receive by props?
// function mapDispatchToProps(dispatch) {
//   return {
//     addUser: (user) => dispatch(addUser(user)),
//     removeUser: (index) => dispatch(removeUser(index)),
//   }
// }

export default connect(mapStateToProps)(UsersContainer);