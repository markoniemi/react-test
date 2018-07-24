import {applyMiddleware, combineReducers, createStore, GenericStoreEnhancer, Middleware, Store} from "redux";
import thunk from "redux-thunk";
import Message from "../domain/Message";
import User from "../domain/User";
import loginReducer, {ILoginState} from "../reducers/LoginReducer";
import messagesReducer from "../reducers/MessagesReducer";
import usersReducer from "../reducers/UsersReducer";

export const reducers = combineReducers<IRootState>({
  login: loginReducer,
  users: usersReducer,
  messages: messagesReducer,
});

const middlewares: Middleware[] = [thunk];
const storeEnhancer: GenericStoreEnhancer = applyMiddleware(...middlewares);

export interface IRootState {
  users?: ReadonlyArray<User>;
  login?: Readonly<ILoginState>;
  messages?: ReadonlyArray<Message>;
}

const store: Store<IRootState> = createStore<IRootState>(reducers, storeEnhancer);
export default store;
