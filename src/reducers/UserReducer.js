import { CHANGE_USERNAME, CHANGE_EMAIL } from '../actions/UserActions';

export default function(state = {}, action) {
    switch (action.type) {
        case CHANGE_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            });
            break;
        case CHANGE_EMAIL:
            return Object.assign({}, state, {
                email: action.email
            });
            break;
    }
    return state;
}
