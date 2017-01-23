import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import userReducer from '../reducers/UserReducer';
import usersReducer from '../reducers/UsersReducer';
import createLogger from 'redux-logger';

import { combineReducers } from 'redux';

export const reducers = combineReducers({
    user: userReducer,
    users: usersReducer
});

const logger = createLogger();
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);
// const store = createStore(reducers);
export default store;

// store.subscribe(() => {
//     console.log("user: " + store.getState().user);
//     console.log("tweets: " + store.getState().tweets);
// });
