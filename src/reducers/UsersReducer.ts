import * as Debug from "debug";
import {browserHistory} from "react-router";
import {IUserAction, UserActionType} from "../actions/UserActions";
import User from "../domain/User";

const debug: Debug.IDebugger = Debug("UsersReducer");
export default (state: ReadonlyArray<User> = [], action: IUserAction): ReadonlyArray<User> => {
  switch (action.type) {
    case UserActionType.FETCH_USERS_SUCCESS:
      return fetchUsers(state, action);
    case UserActionType.EDIT_USER_SUCCESS:
      return editUser(state, action);
    case UserActionType.ADD_USER_SUCCESS:
      return addUser(state, action);
    case UserActionType.REMOVE_USER_SUCCESS:
      return removeUser(state, action);
    case UserActionType.RESET_USERS:
      return resetUsers(state, action);
  }
  return state;
};

function fetchUsers(state: ReadonlyArray<User>, action: IUserAction) {
  return [...action.payload.users];
}

function editUser(state: ReadonlyArray<User>, action: IUserAction) {
  debug("EDIT_USER_SUCCESS: %s", action.payload.user.username);
  return [...state.map((user: User) => {
    if (user._id !== action.payload.user._id) {
      return user;
    }
    return action.payload.user;
  })];
}

function addUser(state: ReadonlyArray<User>, action: IUserAction) {
  debug("ADD_USER_SUCCESS: %s", action.payload.user.username);
  return [...state.filter((user: User) => {
    return user._id !== action.payload.user._id;
  }), {...action.payload.user}];
}

function removeUser(state: ReadonlyArray<User>, action: IUserAction) {
  debug("REMOVE_USER_SUCCESS: %s", action.payload.user._id);
  return [...state.filter((user: User) => {
    return user._id !== action.payload.user._id;
  })];
}

function resetUsers(state: ReadonlyArray<User>, action: IUserAction) {
  return [];
}
