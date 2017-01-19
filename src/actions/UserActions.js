export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RESET_USERS = 'RESET_USERS';

export function changeUsername(username) {
    return {
        type: CHANGE_USERNAME,
        username: username
    }
}
export function changeEmail(email) {
    return {
        type: CHANGE_EMAIL,
        email: email
    }
}
// TODO use name and age as parameters instead of user?
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
export function resetUsers() {
    return {
        type: RESET_USERS
    }
}