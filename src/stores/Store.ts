import {GenericStoreEnhancer, Middleware} from "redux";
import * as Redux from "redux";
import thunk from "redux-thunk";
import User from "../domain/User";
import {ILoginState} from "../reducers/LoginReducer";
import usersReducer from "../reducers/UsersReducer";
import loginReducer from "../reducers/LoginReducer";

export const reducers = Redux.combineReducers<IRootState>({
  login: loginReducer,
  users: usersReducer,
});

const middlewares: Middleware[] = [thunk];
// middlewares.push(createLogger());
const storeEnhancer: GenericStoreEnhancer = Redux.applyMiddleware(...middlewares);

export interface IRootState {
  users: ReadonlyArray<User>;
  login?: Readonly<ILoginState>;
}

const store: Redux.Store<IRootState> = Redux.createStore<IRootState>(reducers, storeEnhancer);
export default store;

// store.subscribe(() => {
//   debug("users: %O", store.getState().users);
// });
