import * as Debug from "debug";
import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import Jwt from "../api/Jwt";
import LoginApi from "../api/LoginApi";
import {ILoginForm} from "../components/LoginForm";
import history from "../history";
import {ILoginState} from "../reducers/LoginReducer";
import {IRootState} from "../stores/Store";
import MessageActions from "./MessageActions";
import UserActions from "./UserActions";

export interface ILoginAction extends Action<ILoginState> {
  type: LoginActionType;
}

export enum LoginActionType {
  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  LOGOUT_REQUEST = "LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_ERROR = "LOGOUT_ERROR",
}

export default class LoginActions {
  private static readonly debug: Debug.IDebugger = Debug("LoginActions");

  public static login(loginForm: ILoginForm): ThunkAction<Promise<ILoginAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<ILoginAction> => {
      dispatch(MessageActions.resetMessages());
      dispatch(this.loginRequest());
      try {
        const loginState: ILoginState = await LoginApi.login(loginForm);
        LoginActions.debug("login returned token: " + loginState.token);
        return dispatch(this.loginSuccess(loginState));
      } catch (error) {
        dispatch(MessageActions.error(error.toString()));
        return dispatch(this.loginError(error));
      }
    };
  }

  public static logout(): ThunkAction<Promise<ILoginAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<ILoginAction> => {
      dispatch(this.logoutRequest());
      try {
        LoginActions.debug("logout requested");
        Jwt.clearToken();
        // TODO how to reset the rootState?
        dispatch(UserActions.resetUsers());
        return dispatch(this.logoutSuccess());
      } catch (error) {
        return dispatch(this.logoutError());
      }
    };
  }

  public static loginRequest(): ILoginAction {
    return {
      type: LoginActionType.LOGIN_REQUEST,
    };
  }

  public static loginSuccess(loginState: ILoginState): ILoginAction {
    LoginActions.debug("loginSuccess: storing token to sessionStorage: " + loginState.token);
    Jwt.setToken(loginState.token);
    history.push("/users");
    return {
      type: LoginActionType.LOGIN_SUCCESS,
      payload: {
        isAuthenticated: true,
        token: loginState.token,
        user: loginState.user,
      },
    };
  }

  public static loginError(error: Error): ILoginAction {
    LoginActions.debug(error);
    return {
      type: LoginActionType.LOGIN_ERROR,
    };
  }

  public static logoutRequest(): ILoginAction {
    return {
      type: LoginActionType.LOGOUT_REQUEST,
    };
  }

  public static logoutSuccess(): ILoginAction {
    history.push("/");
    return {
      type: LoginActionType.LOGOUT_SUCCESS,
    };
  }

  public static logoutError(): ILoginAction {
    return {
      type: LoginActionType.LOGOUT_ERROR,
    };
  }
}
