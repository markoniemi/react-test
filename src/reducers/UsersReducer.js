import { ADD_USER, REMOVE_USER, RESET_USERS } from '../actions/UserActions';

// TODO spread operator makes adding user ever so simpler
// return [
//     ...state,
//     {
//         name: action.name,
//         age: action.age
//     }
// ]
export default function(state = [], action) {
    switch (action.type) {
        case ADD_USER:
            return state.slice().concat(action.user);
            break;
        case REMOVE_USER:
            // return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];
            return state.slice(0, action.index).concat(state.slice(action.index + 1));
            break;
        case RESET_USERS:
            return [];
            break;
    }
    return state;
}
