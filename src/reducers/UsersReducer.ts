import {browserHistory} from "react-router";
import UserActions from "../actions/UserActions";

// TODO add param types
export default (state = [], action) => {
  switch (action.type) {
    case UserActions.FETCH_USERS_SUCCESS:
      return [...action.users];
    case UserActions.EDIT_USER_SUCCESS:
      browserHistory.push("/");
      // TODO replace with proper log
      console.log("EDIT_USER_SUCCESS: " + action.user.username);
      return [...state.map((user) => {
        if (user._id !== action.user._id) {
          return user;
        }
        return action.user;
      })];
    case UserActions.ADD_USER_SUCCESS:
      browserHistory.push("/");
      console.log("ADD_USER_SUCCESS: " + action.user.username);
      return [...state.filter((user) => {
        return user._id !== action.id;
      }), Object.assign({}, action.user)];
    case UserActions.REMOVE_USER_SUCCESS:
      browserHistory.push("/");
      console.log("REMOVE_USER_SUCCESS: " + action.user._id);
      return [...state.filter((user) => {
        return user._id !== action.user._id;
      })];
    case UserActions.RESET_USERS:
      return [];
  }
  return state;
};
