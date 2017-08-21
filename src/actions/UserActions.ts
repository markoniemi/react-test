import "isomorphic-fetch";
import {Dispatch} from "react-redux";
import {ThunkAction} from "redux-thunk";
import User from "../domain/User";
import {IRootState} from "../stores/Store";

export interface IUserAction {
  type: string;
  user?: User;
  users?: User[];
}

export default class UserActions {
  public static readonly FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
  public static readonly FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
  public static readonly FETCH_USERS_ERROR = "FETCH_USERS_ERROR";
  public static readonly ADD_USER_REQUEST = "ADD_USER_REQUEST";
  public static readonly ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
  public static readonly ADD_USER_ERROR = "ADD_USER_ERROR";
  public static readonly REMOVE_USER_REQUEST = "REMOVE_USER_REQUEST";
  public static readonly REMOVE_USER_SUCCESS = "REMOVE_USER_SUCCESS";
  public static readonly REMOVE_USER_ERROR = "REMOVE_USER_ERROR";
  public static readonly EDIT_USER_REQUEST = "EDIT_USER_REQUEST";
  public static readonly EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
  public static readonly EDIT_USER_ERROR = "EDIT_USER_ERROR";
  public static readonly RESET_USERS = "RESET_USERS";

  public static fetchUsers(): ThunkAction<Promise<IUserAction>, IRootState, any> {
    return (dispatch: Dispatch<IRootState>): Promise<IUserAction> => {
      dispatch(this.fetchUsersRequest());
      return fetch("http://localhost:8080/api/users")
        .then((response: Response): Promise<User[]> => response.json())
        .then((users: User[]): IUserAction => dispatch(this.fetchUsersSuccess(users)))
        .catch((): IUserAction => dispatch(this.fetchUsersError()));
    };
  }

  public static fetchUsersRequest(): IUserAction {
    return {
      type: this.FETCH_USERS_REQUEST,
    };
  }

  public static fetchUsersSuccess(users): IUserAction {
    return {
      type: this.FETCH_USERS_SUCCESS,
      users: users,
    };
  }

  public static fetchUsersError(): IUserAction {
    return {
      type: this.FETCH_USERS_ERROR,
    };
  }

  public static addUserRequest(): IUserAction {
    return {
      type: this.ADD_USER_REQUEST,
    };
  }

  public static addUser(user: User) {
    return (dispatch) => {
      dispatch(this.addUserRequest());
      const request = {
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      };
      return fetch("http://localhost:8080/api/users/", request)
        .then((response: Response): Promise<User> => response.json())
        .then((user: User): IUserAction => dispatch(this.addUserSuccess(user)))
        .catch((): IUserAction => dispatch(this.addUserError()));
    };
  }

  public static removeUser(user: User) {
    return (dispatch) => {
      dispatch(this.removeUserRequest());
      const request = {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      };
      return fetch("http://localhost:8080/api/users/" + user._id, request)
        .then((): IUserAction => dispatch(this.removeUserSuccess(user)))
        .catch((): IUserAction => dispatch(this.removeUserError()));
    };
  }

  public static removeUserRequest(): IUserAction {
    return {
      type: this.REMOVE_USER_REQUEST,
    };
  }

  public static removeUserSuccess(user: User): IUserAction {
    return {
      type: this.REMOVE_USER_SUCCESS,
      user: user,
    };
  }

  public static removeUserError(): IUserAction {
    return {
      type: this.REMOVE_USER_ERROR,
    };
  }

  public static editUser(user: User) {
    return (dispatch) => {
      dispatch(this.editUserRequest());
      const request = {
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      };
      return fetch("http://localhost:8080/api/users/" + user._id, request)
        .then((): IUserAction => dispatch(this.editUserSuccess(user)))
        .catch((): IUserAction => dispatch(this.editUserError()));
    };
  }

  public static editUserRequest(): IUserAction {
    return {
      type: this.EDIT_USER_REQUEST,
    };
  }

  public static editUserSuccess(user: User): IUserAction {
    return {
      type: this.EDIT_USER_SUCCESS,
      user: user,
    };
  }

  public static editUserError(): IUserAction {
    return {
      type: this.EDIT_USER_ERROR,
    };
  }

  public static addUserSuccess(user: User): IUserAction {
    return {
      type: this.ADD_USER_SUCCESS,
      user: user,
    };
  }

  public static addUserError(): IUserAction {
    return {
      type: this.ADD_USER_ERROR,
    };
  }

  public static resetUsers(): IUserAction {
    return {
      type: this.RESET_USERS,
    };
  }
}
