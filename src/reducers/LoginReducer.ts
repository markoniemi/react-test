import * as Debug from "debug";
import {browserHistory} from "react-router";
import {ILoginAction, LoginActionType} from "../actions/LoginActions";
import {UserActionType} from "../actions/UserActions";
import User from "../domain/User";

export interface ILoginState {
  isAuthenticated: boolean;
  token?: string;
  user?: User;
}

const initialState: ILoginState = {
  isAuthenticated: false,
}
// TODO check if token has expired
// TODO use null instead of initialState
export default (state: Readonly<ILoginState> = initialState, action: ILoginAction): Readonly<ILoginState> => {
  const debug: Debug.IDebugger = Debug("LoginReducer");
  // TODO add other actions
  switch (action.type) {
    case LoginActionType.LOGIN_SUCCESS:
      const loginState: ILoginState = {isAuthenticated: true, token: "token", user: action.user};
      return loginState;
    default:
      return state;
  }
};
