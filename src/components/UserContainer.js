import React from 'react';
import {connect} from 'react-redux';
import EditUser from './EditUser';

export class UserContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EditUser user={this.props.user}/>
    );
  }
}
UserContainer.propTypes = {
  user: React.PropTypes.object
};

// Which action creators does it want to receive by props?
// function mapDispatchToProps(dispatch) {
//   return {
//     addUser: (user) => dispatch(addUser(user)),
//     removeUser: (index) => dispatch(removeUser(index)),
//   }
// }

function findUserById(users, id) {
  // TODO rewrite this
  let user = users.find(user => user.id == id);
  return Object.assign({}, user);
}

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = function (state, props) {
  let user = {username: '', email: ''};
  const userId = props.params.id;
  if (state.users.length > 0) {
    user = findUserById(state.users, userId);
  }
  // TODO find user from state
  return {
    user: user
  };
};

export default connect(mapStateToProps)(UserContainer);
