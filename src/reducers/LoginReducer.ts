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
};
// TODO check if token has expired
// TODO use null instead of initialState
const debug: Debug.IDebugger = Debug("LoginReducer");
export default (state: Readonly<ILoginState> = initialState, action: ILoginAction): Readonly<ILoginState> => {
  // TODO add other actions
  // TODO check for errors
  switch (action.type) {
    case LoginActionType.LOGIN_SUCCESS:
      return login(state, action);
    default:
      return state;
  }
};

function login(state: Readonly<ILoginState>, action: ILoginAction): Readonly<ILoginState> {
  return {isAuthenticated: action.payload.isAuthenticated, token: action.payload.token, user: action.payload.user};
}
