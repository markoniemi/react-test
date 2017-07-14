import * as Redux from "redux";
import usersReducer from "../reducers/UsersReducer";
import thunk from "redux-thunk";
import User from "../domain/User";

export const reducers = Redux.combineReducers<IRootState>({
  users: usersReducer,
});

const middlewares = [thunk];
// middlewares.push(createLogger());
const middleware = Redux.applyMiddleware(...middlewares);

interface IRootState {
  users: User[];
}

const store: Redux.Store<IRootState> = Redux.createStore<IRootState>(reducers, middleware);
export default store;

// store.subscribe(() => {
//     console.log("user: " + store.getState().user);
//     console.log("tweets: " + store.getState().tweets);
// });
