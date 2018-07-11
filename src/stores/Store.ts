import * as Redux from "redux";
import {GenericStoreEnhancer, Middleware} from "redux";
import thunk from "redux-thunk";
import Message from "../domain/Message";
import User from "../domain/User";
import loginReducer, {ILoginState} from "../reducers/LoginReducer";
import messagesReducer from "../reducers/MessagesReducer";
import usersReducer from "../reducers/UsersReducer";

export const reducers = Redux.combineReducers<IRootState>({
  login: loginReducer,
  users: usersReducer,
  messages: messagesReducer,
});

const middlewares: Middleware[] = [thunk];
const storeEnhancer: GenericStoreEnhancer = Redux.applyMiddleware(...middlewares);

export interface IRootState {
  users?: ReadonlyArray<User>;
  login?: Readonly<ILoginState>;
  messages?: ReadonlyArray<Message>;
}

const store: Redux.Store<IRootState> = Redux.createStore<IRootState>(reducers, storeEnhancer);
export default store;
