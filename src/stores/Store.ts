import {connectRouter, routerMiddleware} from "connected-react-router";
import {applyMiddleware, combineReducers, createStore, GenericStoreEnhancer, Middleware, Store} from "redux";
import thunk from "redux-thunk";
import Message from "../domain/Message";
import User from "../domain/User";
import history from "../history";
import loginReducer, {ILoginState} from "../reducers/LoginReducer";
import messagesReducer from "../reducers/MessagesReducer";
import usersReducer from "../reducers/UsersReducer";

export const rootReducer = combineReducers<IRootState>({
  login: loginReducer,
  users: usersReducer,
  messages: messagesReducer,
});

const middlewares: Middleware[] = [thunk, routerMiddleware(history)];
const storeEnhancer: GenericStoreEnhancer = applyMiddleware(...middlewares);

export interface IRootState {
  users?: ReadonlyArray<User>;
  login?: Readonly<ILoginState>;
  messages?: ReadonlyArray<Message>;
}
const enhanceRootReducer = connectRouter(history);
const store: Store<IRootState> = createStore<IRootState>(enhanceRootReducer(rootReducer), storeEnhancer);
export default store;
