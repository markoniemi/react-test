import * as Debug from "debug";
import User from "../domain/User";

export default class UserApi {
  public static async fetchUsers(): Promise<User[]> {
    const response: Response = await fetch(UserApi.getApiUrl());
    return response.json();
  }

  public static async addUser(user: User): Promise<User> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: new Headers({"content-type": "application/json"}),
      method: "POST",
    };
    const response: Response = await fetch(UserApi.getApiUrl(), request);
    return response.json();
  }

  public static async removeUser(user: User): Promise<void> {
    const request: RequestInit = {
      headers: new Headers({"content-type": "application/json"}),
      method: "DELETE",
    };
    await fetch(UserApi.getApiUrl() + user._id, request);
  }

  public static async editUser(user: User): Promise<void> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: new Headers({"content-type": "application/json"}),
      method: "PUT",
    };
    await fetch(UserApi.getApiUrl() + user._id, request);
  }
  private static getApiUrl(): string {
    const debug: Debug.IDebugger = Debug("UsersReducer");
    debug(process.env.HOST);
    return "http://" + process.env.HOST + ":" + process.env.PORT + "/api/users/";
  }
}
