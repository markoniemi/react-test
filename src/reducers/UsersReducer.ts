import * as Debug from "debug";
import {browserHistory} from "react-router";
import {IUserAction, UserActionType} from "../actions/UserActions";
import User from "../domain/User";

export default (state: ReadonlyArray<User> = [], action: IUserAction): ReadonlyArray<User> => {
  const debug: Debug.IDebugger = Debug("UsersReducer");
  switch (action.type) {
    case UserActionType.FETCH_USERS_SUCCESS:
      return [...action.users];
    case UserActionType.EDIT_USER_SUCCESS:
      debug("EDIT_USER_SUCCESS: %s", action.user.username);
      return [...state.map((user: User) => {
        if (user._id !== action.user._id) {
          return user;
        }
        return action.user;
      })];
    case UserActionType.ADD_USER_SUCCESS:
      debug("ADD_USER_SUCCESS: %s", action.user.username);
      return [...state.filter((user: User) => {
        return user._id !== action.user._id;
      }), {...action.user}];
    case UserActionType.REMOVE_USER_SUCCESS:
      debug("REMOVE_USER_SUCCESS: %s", action.user._id);
      return [...state.filter((user: User) => {
        return user._id !== action.user._id;
      })];
    case UserActionType.RESET_USERS:
      return [];
  }
  return state;
};
