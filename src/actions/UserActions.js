import 'isomorphic-fetch';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const REMOVE_USER = 'REMOVE_USER';
export const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
export const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER = 'EDIT_USER';
export const RESET_USERS = 'RESET_USERS';

export function fetchUsers() {
  // UserApi.loadUsers();
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    return fetch('http://localhost:8080/api/users')
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        dispatch(fetchUsersSuccess(users));
      })
      .catch(() => dispatch(fetchUsersError()));
  };
}
export function fetchUsersRequest() {
  return {
    type: FETCH_USERS
  };
}
export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users: users
  };
}
export function fetchUsersError() {
  return {
    type: FETCH_USERS_ERROR
  };
}
export function addUserRequest() {
  return {
    type: ADD_USER_REQUEST
  };
}
export function addUser(user) {
  return (dispatch) => {
    dispatch(addUserRequest());
      return fetch('http://localhost:8080/api/users/', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        dispatch(addUserSuccess(user));
      });
    // .catch(() => dispatch(fetchUsersError()));
  };
}
export function removeUser(user) {
  return (dispatch) => {
    dispatch(removeUserRequest());
      return fetch('http://localhost:8080/api/users/' + user._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(() => {
        dispatch(removeUserSuccess(user));
      });
    // .catch(() => dispatch(fetchUsersError()));
  };
}
export function removeUserRequest() {
  return {
    type: REMOVE_USER_REQUEST
  };
}
export function removeUserSuccess(user) {
  return {
    type: REMOVE_USER_SUCCESS,
    user: user
  };
}
export function editUser(user) {
  return (dispatch) => {
    dispatch(editUserRequest());
      return fetch('http://localhost:8080/api/users/' + user._id, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .then(() => {
        dispatch(editUserSuccess(user));
      });
    // .catch(() => dispatch(editUserError()));
  };
}
export function editUserRequest() {
  return {
    type: EDIT_USER_REQUEST
  };
}
export function editUserSuccess(user) {
  return {
    type: EDIT_USER_SUCCESS,
    user: user
  };
}
export function addUserSuccess(user) {
  return {
    type: ADD_USER_SUCCESS,
    user: user
  };
}
export function resetUsers() {
  return {
    type: RESET_USERS
  };
}
