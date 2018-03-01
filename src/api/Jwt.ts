import * as Debug from "debug";

export default class Jwt {
  private static debug: Debug.IDebugger = Debug("Jwt");
  public static JWT_TOKEN_KEY: string = "jwt";

  public static getHeaders(): Headers {
    const jwtToken: string = sessionStorage.getItem(Jwt.JWT_TOKEN_KEY);
    this.debug(`setting jwt to header: ${jwtToken}`);
    return new Headers({"content-type": "application/json", "Authorization": `Bearer ${jwtToken}`});
  }

  public static isAuthenticated(): boolean {
    return !(Jwt.getToken() === null);
  }

  public static setToken(token: string) {
    sessionStorage.setItem(Jwt.JWT_TOKEN_KEY, token);
  }

  public static getToken(): string {
    return sessionStorage.getItem(Jwt.JWT_TOKEN_KEY);
  }

  public static clearToken() {
    sessionStorage.removeItem(Jwt.JWT_TOKEN_KEY);
  }
}
