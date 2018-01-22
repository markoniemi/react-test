import * as IDebug from "debug";
import {IDebugger} from "debug";
import {browserHistory} from "react-router";
import {IUserAction, UserActionType} from "../actions/UserActions";
import User from "../domain/User";

export default (state: User[] = [], action: IUserAction) => {
  const debug: IDebugger = IDebug("UsersReducer");
  switch (action.type) {
    case UserActionType.FETCH_USERS_SUCCESS:
      return [...action.users];
    case UserActionType.EDIT_USER_SUCCESS:
      browserHistory.push("/");
      debug("EDIT_USER_SUCCESS: %s", action.user.username);
      return [...state.map((user: User) => {
        if (user._id !== action.user._id) {
          return user;
        }
        return action.user;
      })];
    case UserActionType.ADD_USER_SUCCESS:
      browserHistory.push("/");
      debug("ADD_USER_SUCCESS: %s", action.user.username);
      return [...state.filter((user: User) => {
        return user._id !== action.user._id;
      }), {...action.user}];
    case UserActionType.REMOVE_USER_SUCCESS:
      browserHistory.push("/");
      debug("REMOVE_USER_SUCCESS: %s", action.user._id);
      return [...state.filter((user: User) => {
        return user._id !== action.user._id;
      })];
    case UserActionType.RESET_USERS:
      return [];
  }
  return state;
};
