import * as Debug from "debug";
import Jwt from "../api/Jwt";
import {ILoginForm} from "../components/LoginForm";
import User from "../domain/User";
import {ILoginState} from "../reducers/LoginReducer";

export default class LoginApi {
  private static readonly debug: Debug.IDebugger = Debug("LoginApi");

  public static async login(loginForm: ILoginForm): Promise<ILoginState> {
    const request: RequestInit = {
      body: JSON.stringify(loginForm),
      headers: Jwt.getHeaders(),
      method: "POST",
    };
    const response: Response = await fetch(LoginApi.getApiUrl(), request);
    if (!response.ok) {
      throw new Error("login.error");
    }
    return response.json();
  }

  // TODO logout using token?
  // TODO return void?
  // TODO not needed in api?
  public static async logout(user: User): Promise<User> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: Jwt.getHeaders(),
      method: "POST",
    };
    const response: Response = await fetch(LoginApi.getApiUrl(), request);
    return response.json();
  }

  public static getApiUrl(): string {
    return "http://" + process.env.HOST + ":" + process.env.PORT + "/api/login/";
  }
}
