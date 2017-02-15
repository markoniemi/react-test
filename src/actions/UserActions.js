export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const EDIT_USER = 'EDIT_USER';
export const RESET_USERS = 'RESET_USERS';

export function addUser(user) {
  return {
    type: ADD_USER,
    user: user
  }
}
export function removeUser(index) {
  return {
    type: REMOVE_USER,
    index: index
  }
}
export function editUser(index, user) {
  return {
    type: EDIT_USER,
    index: index,
    user: user
  }
}
export function resetUsers() {
  return {
    type: RESET_USERS
  }
}