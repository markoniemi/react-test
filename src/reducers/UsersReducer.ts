import * as IDebug from "debug";
import {browserHistory} from "react-router";
import UserActions, {IUserAction} from "../actions/UserActions";
import User from "../domain/User";

export default (state: User[] = [], action: IUserAction) => {
  const debug = IDebug("UsersReducer");
  switch (action.type) {
    case UserActions.FETCH_USERS_SUCCESS:
      return [...action.users];
    case UserActions.EDIT_USER_SUCCESS:
      browserHistory.push("/");
      debug("EDIT_USER_SUCCESS: %s", action.user.username);
      return [...state.map((user: User) => {
        if (user._id !== action.user._id) {
          return user;
        }
        return action.user;
      })];
    case UserActions.ADD_USER_SUCCESS:
      browserHistory.push("/");
      debug("ADD_USER_SUCCESS: %s", action.user.username);
      return [...state.filter((user: User) => {
        return user._id !== action.user._id;
      }), Object.assign({}, action.user)];
    case UserActions.REMOVE_USER_SUCCESS:
      browserHistory.push("/");
      debug("REMOVE_USER_SUCCESS: %s", action.user._id);
      return [...state.filter((user: User) => {
        return user._id !== action.user._id;
      })];
    case UserActions.RESET_USERS:
      return [];
  }
  return state;
};
