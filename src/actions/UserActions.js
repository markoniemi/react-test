import fetch from 'isomorphic-fetch';
import store from '../stores/Store';
// TODO move to actionTypes.js
export const FETCH_USERS = 'FETCH_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const EDIT_USER = 'EDIT_USER';
export const RESET_USERS = 'RESET_USERS';

export function fetchUsers() {
  loadUsers();
  return {
    type: FETCH_USERS
  };
}
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: users
  };
}
export function addUser(user) {
  return {
    type: ADD_USER,
    user: user
  };
}
export function removeUser(index) {
  return {
    type: REMOVE_USER,
    index: index
  };
}
export function editUser(index, user) {
  return {
    type: EDIT_USER,
    index: index,
    user: user
  };
}
export function resetUsers() {
  return {
    type: RESET_USERS
  };
}

// TODO move to UserService
function loadUsers() {
  fetch('http://localhost:5000/api/users').then(function (response) {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
    .then(function (users) {
      store.dispatch(receiveUsers(users));
    });
}
