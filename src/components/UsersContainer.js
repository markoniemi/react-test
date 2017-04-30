import React from 'react';
import {connect} from 'react-redux';
import Users from './Users';
import {fetchUsers} from '../actions/UserActions';
import store from '../stores/Store';

export class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(fetchUsers());
  }

  render() {
    return (
      <Users users={this.props.users}/>
    );
  }
}
UsersContainer.propTypes = {
  users: React.PropTypes.array
};

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = function (store) {
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
