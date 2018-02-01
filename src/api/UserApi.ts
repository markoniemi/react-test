import User from "../domain/User";

export default class UserApi {
  private static apiUrl = "http://localhost:8080/api/users/";
  public static async fetchUsers(): Promise<User[]> {
    const response: Response = await fetch(UserApi.apiUrl);
    return response.json();
  }

  public static async addUser(user: User): Promise<User> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: new Headers({"content-type": "application/json"}),
      method: "POST",
    };
    const response: Response = await fetch(UserApi.apiUrl, request);
    return response.json();
  }

  public static async removeUser(user: User): Promise<void> {
    const request: RequestInit = {
      headers: new Headers({"content-type": "application/json"}),
      method: "DELETE",
    };
    await fetch(UserApi.apiUrl + user._id, request);
  }

  public static async editUser(user: User): Promise<void> {
    const request: RequestInit = {
      body: JSON.stringify(user),
      headers: new Headers({"content-type": "application/json"}),
      method: "PUT",
    };
    await fetch(UserApi.apiUrl + user._id, request);
  }
}
