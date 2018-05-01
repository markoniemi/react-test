import * as Redux from "redux";
import {GenericStoreEnhancer, Middleware} from "redux";
import thunk from "redux-thunk";
import User from "../domain/User";
import loginReducer, {ILoginState} from "../reducers/LoginReducer";
import usersReducer from "../reducers/UsersReducer";

export const reducers = Redux.combineReducers<IRootState>({
  login: loginReducer,
  users: usersReducer,
});

const middlewares: Middleware[] = [thunk];
const storeEnhancer: GenericStoreEnhancer = Redux.applyMiddleware(...middlewares);

export interface IRootState {
  users: ReadonlyArray<User>;
  login?: Readonly<ILoginState>;
}

const store: Redux.Store<IRootState> = Redux.createStore<IRootState>(reducers, storeEnhancer);
export default store;
