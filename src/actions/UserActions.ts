import "isomorphic-fetch";
import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import UserApi from "../api/UserApi";
import User from "../domain/User";
import {IRootState} from "../stores/Store";
import hashHistory from "../history";

export interface IUserActionPayload {
  user?: User;
  users?: User[];
}

export interface IUserAction extends Action<IUserActionPayload> {
  type: UserActionType;
}

export enum UserActionType {
  FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST",
  FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS",
  FETCH_USERS_ERROR = "FETCH_USERS_ERROR",
  ADD_USER_REQUEST = "ADD_USER_REQUEST",
  ADD_USER_SUCCESS = "ADD_USER_SUCCESS",
  ADD_USER_ERROR = "ADD_USER_ERROR",
  REMOVE_USER_REQUEST = "REMOVE_USER_REQUEST",
  REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS",
  REMOVE_USER_ERROR = "REMOVE_USER_ERROR",
  EDIT_USER_REQUEST = "EDIT_USER_REQUEST",
  EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS",
  EDIT_USER_ERROR = "EDIT_USER_ERROR",
  RESET_USERS = "RESET_USERS",
}

export default class UserActions {
  public static fetchUsers(): ThunkAction<Promise<IUserAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<IUserAction> => {
      dispatch(this.fetchUsersRequest());
      try {
        const users: User[] = await UserApi.fetchUsers();
        return dispatch(this.fetchUsersSuccess(users));
      } catch (error) {
        return dispatch(this.fetchUsersError());
      }
    };
  }

  public static fetchUsersRequest(): IUserAction {
    return {
      type: UserActionType.FETCH_USERS_REQUEST,
    };
  }

  public static fetchUsersSuccess(users: User[]): IUserAction {
    return {
      type: UserActionType.FETCH_USERS_SUCCESS,
      payload: {users},
    };
  }

  public static fetchUsersError(): IUserAction {
    return {
      type: UserActionType.FETCH_USERS_ERROR,
    };
  }

  public static addUserRequest(): IUserAction {
    return {
      type: UserActionType.ADD_USER_REQUEST,
    };
  }

  public static addUser(user: User): ThunkAction<Promise<IUserAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<IUserAction> => {
      dispatch(this.addUserRequest());
      try {
        const savedUser: User = await UserApi.addUser(user);
        return dispatch(this.addUserSuccess(savedUser));
      } catch (error) {
        return dispatch(this.addUserError());
      }
    };
  }

  public static removeUser(user: User) {
    return async (dispatch: Dispatch<IRootState>): Promise<IUserAction> => {
      dispatch(this.removeUserRequest());
      try {
        await UserApi.removeUser(user);
        return dispatch(this.removeUserSuccess(user));
      } catch (error) {
        return dispatch(this.removeUserError());
      }
    };
  }

  public static removeUserRequest(): IUserAction {
    return {
      type: UserActionType.REMOVE_USER_REQUEST,
    };
  }

  public static removeUserSuccess(user: User): IUserAction {
    hashHistory.push("/users");
    return {
      type: UserActionType.REMOVE_USER_SUCCESS,
      payload: {user},
    };
  }

  public static removeUserError(): IUserAction {
    return {
      type: UserActionType.REMOVE_USER_ERROR,
    };
  }

  public static editUser(user: User) {
    return async (dispatch: Dispatch<IRootState>): Promise<IUserAction> => {
      dispatch(this.editUserRequest());
      try {
        await UserApi.editUser(user);
        return dispatch(this.editUserSuccess(user));
      } catch (error) {
        return dispatch(this.editUserError());
      }
    };
  }

  public static editUserRequest(): IUserAction {
    return {
      type: UserActionType.EDIT_USER_REQUEST,
    };
  }

  public static editUserSuccess(user: User): IUserAction {
    hashHistory.push("/users");
    return {
      type: UserActionType.EDIT_USER_SUCCESS,
      payload: {user},
    };
  }

  public static editUserError(): IUserAction {
    return {
      type: UserActionType.EDIT_USER_ERROR,
    };
  }

  public static addUserSuccess(user: User): IUserAction {
    hashHistory.push("/users");
    return {
      type: UserActionType.ADD_USER_SUCCESS,
      payload: {user},
    };
  }

  public static addUserError(): IUserAction {
    return {
      type: UserActionType.ADD_USER_ERROR,
    };
  }

  public static resetUsers(): IUserAction {
    return {
      type: UserActionType.RESET_USERS,
    };
  }
}
