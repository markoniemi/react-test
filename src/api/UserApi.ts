import Jwt from "../../src/api/Jwt";
import User from "../domain/User";

export default class UserApi {
  public static async fetchUsers(): Promise<User[]> {
    const request: RequestInit = {
      headers: Jwt.getHeaders(),
      method: "GET",
    };
    const response: Response = await fetch(UserApi.getApiUrl(), request);
    return response.json();
  }

  public static async addUser(user: User): Promise<User> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: Jwt.getHeaders(),
      method: "POST",
    };
    const response: Response = await fetch(UserApi.getApiUrl(), request);
    return response.json();
  }

  public static async removeUser(user: User): Promise<void> {
    const request: RequestInit = {
      headers: Jwt.getHeaders(),
      method: "DELETE",
    };
    await fetch(UserApi.getApiUrl() + user._id, request);
  }

  public static async editUser(user: User): Promise<void> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: Jwt.getHeaders(),
      method: "PUT",
    };
    await fetch(UserApi.getApiUrl() + user._id, request);
  }
  private static getApiUrl(): string {
    return "http://" + process.env.HOST + ":" + process.env.PORT + "/api/users/";
  }
}
