import * as Redux from "redux";
import {GenericStoreEnhancer, Middleware} from "redux";
import thunk from "redux-thunk";
import Notification from "../domain/Notification";
import User from "../domain/User";
import loginReducer, {ILoginState} from "../reducers/LoginReducer";
import notificationsReducer from "../reducers/NotificationsReducer";
import usersReducer from "../reducers/UsersReducer";

export const reducers = Redux.combineReducers<IRootState>({
  login: loginReducer,
  users: usersReducer,
  notifications: notificationsReducer,
});

const middlewares: Middleware[] = [thunk];
const storeEnhancer: GenericStoreEnhancer = Redux.applyMiddleware(...middlewares);

export interface IRootState {
  users?: ReadonlyArray<User>;
  login?: Readonly<ILoginState>;
  notifications?: ReadonlyArray<Notification>;
}

const store: Redux.Store<IRootState> = Redux.createStore<IRootState>(reducers, storeEnhancer);
export default store;
