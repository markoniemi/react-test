import {createStore} from 'redux';
import {applyMiddleware} from 'redux';
import usersReducer from '../reducers/UsersReducer';
import createLogger from 'redux-logger';

import {combineReducers} from 'redux';

export const reducers = combineReducers({
  users: usersReducer
});

const logger = createLogger();
const middleware = applyMiddleware(logger);

const store = createStore(reducers, middleware);
export default store;

// store.subscribe(() => {
//     console.log("user: " + store.getState().user);
//     console.log("tweets: " + store.getState().tweets);
// });
