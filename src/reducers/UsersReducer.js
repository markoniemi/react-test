import {FETCH_USERS, RECEIVE_USERS, ADD_USER, REMOVE_USER, EDIT_USER, RESET_USERS} from '../actions/UserActions';

// export default function(state = [{username: "user1", email: "email", index: 0}], action) {
export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return state;
    case RECEIVE_USERS:
      return [...action.users];
    case ADD_USER:
      // TODO create proper index or id
      return [...state, {username: action.user.username, email: action.user.email, index: state.length}];
    case REMOVE_USER:
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    case EDIT_USER:
      // TODO use index or id
      return [...state.slice(0, action.index),
        {username: action.user.username, email: action.user.email, index: action.index},
        ...state.slice(action.index + 1)];
    case RESET_USERS:
      return [];
  }
  return state;
}
