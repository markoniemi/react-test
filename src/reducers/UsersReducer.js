import { ADD_USER, REMOVE_USER, EDIT_USER, RESET_USERS } from '../actions/UserActions';

export default function(state = [{username: "user1", email: "email", index: 0}], action) {
    switch (action.type) {
        case ADD_USER:
            // TODO create proper index or id
            return [...state, {username: action.user.username, email: action.user.email, index: state.length }];
            // return state.slice().concat(action.user);
            break;
        case REMOVE_USER:
            return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
            // return state.slice(0, action.index).concat(state.slice(action.index + 1));
            break;
        case EDIT_USER:
            // TODO use index or id
            return [...state.slice(0, action.index),
                {username: action.user.username, email: action.user.email, index: action.index },
                ...state.slice(action.index + 1)];
            break;
        case RESET_USERS:
            return [];
            break;
    }
    return state;
}
