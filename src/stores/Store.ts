import * as Redux from "redux";
import thunk from "redux-thunk";
import User from "../domain/User";
import usersReducer from "../reducers/UsersReducer";

export const reducers = Redux.combineReducers<IRootState>({
  users: usersReducer,
});

const middlewares = [thunk];
// middlewares.push(createLogger());
const middleware = Redux.applyMiddleware(...middlewares);

export interface IRootState {
  users: User[];
}

const store: Redux.Store<IRootState> = Redux.createStore<IRootState>(reducers, middleware);
export default store;

// store.subscribe(() => {
//     console.log("user: " + store.getState().user);
//     console.log("tweets: " + store.getState().tweets);
// });
