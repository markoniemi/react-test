import "isomorphic-fetch";
import User from "../domain/User";

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

  public static fetchUsers() {
    // UserApi.loadUsers();
    return (dispatch) => {
      dispatch(this.fetchUsersRequest());
      return fetch("http://localhost:8080/api/users")
        .then((response) => response.json())
        .then((users) => dispatch(this.fetchUsersSuccess(users)))
        .catch(() => dispatch(this.fetchUsersError()));
    };
  }

  public static fetchUsersRequest() {
    return {
      type: this.FETCH_USERS_REQUEST,
    };
  }

  public static fetchUsersSuccess(users) {
    return {
      type: this.FETCH_USERS_SUCCESS,
      users: users,
    };
  }

  public static fetchUsersError() {
    return {
      type: this.FETCH_USERS_ERROR,
    };
  }

  public static addUserRequest() {
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
        .then((response) => response.json())
        .then((user) => dispatch(this.addUserSuccess(user)))
        .catch(() => dispatch(this.addUserError()));
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
        .then(() => dispatch(this.removeUserSuccess(user)))
        .catch(() => dispatch(this.removeUserError()));
    };
  }

  public static removeUserRequest() {
    return {
      type: this.REMOVE_USER_REQUEST,
    };
  }

  public static removeUserSuccess(user: User) {
    return {
      type: this.REMOVE_USER_SUCCESS,
      user: user,
    };
  }

  public static removeUserError() {
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
        .then(() => dispatch(this.editUserSuccess(user)))
        .catch(() => dispatch(this.editUserError()));
    };
  }

  public static editUserRequest() {
    return {
      type: this.EDIT_USER_REQUEST,
    };
  }

  public static editUserSuccess(user: User) {
    return {
      type: this.EDIT_USER_SUCCESS,
      user: user,
    };
  }

  public static editUserError() {
    return {
      type: this.EDIT_USER_ERROR,
    };
  }

  public static addUserSuccess(user: User) {
    return {
      type: this.ADD_USER_SUCCESS,
      user: user,
    };
  }

  public static addUserError() {
    return {
      type: this.ADD_USER_ERROR,
    };
  }

  public static resetUsers() {
    return {
      type: this.RESET_USERS,
    };
  }
}
