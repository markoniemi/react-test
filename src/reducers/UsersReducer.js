import * as actions from '../actions/UserActions';
import {browserHistory} from 'react-router';

export default function (state = [], action) {
  switch (action.type) {
    case actions.FETCH_USERS_SUCCESS:
      return [...action.users];
    case actions.EDIT_USER_SUCCESS:
      browserHistory.push('/');
      console.log('EDIT_USER_SUCCESS: ' + action.user.username);
      return [...state.map((user) => {
        if (user._id !== action.user._id) {
          return user;
        }
        return action.user;
      })];
    case actions.ADD_USER_SUCCESS:
      browserHistory.push('/');
      console.log('ADD_USER_SUCCESS: ' + action.user.username);
      return [...state.filter((user) => {
        return user._id !== action.id;
      }), Object.assign({}, action.user)];
    case actions.REMOVE_USER_SUCCESS:
      browserHistory.push('/');
      console.log('REMOVE_USER_SUCCESS: ' + action.user._id);
      return [...state.filter((user) => {
        return user._id !== action.user._id;
      })];
    case actions.RESET_USERS:
      return [];
  }
  return state;
}
