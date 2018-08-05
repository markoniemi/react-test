import * as logger from "winston";
import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {ILoginForm} from "../src/components/LoginForm";
import User from "../src/domain/User";
import {ILoginState} from "../src/reducers/LoginReducer";
import UserService from "./UserService";

export default class AuthenticationService {
  // TODO read JWT_SECRET from env.
  public readonly JWT_SECRET: string = "JWT_SECRET";
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.handleLogin = this.handleLogin.bind(this);
    this.authenticateRequest = this.authenticateRequest.bind(this);
  }

  public async handleLogin(request: Request, response: Response, next: NextFunction): Promise<void> {
    const loginForm: ILoginForm = {username: request.body.username, password: request.body.password};
    logger.info("authenticating user: " + loginForm.username);
    const user: User = await this.userService.findByUsername(loginForm.username);
    if (user === null) {
      logger.info("login error");
      response.sendStatus(402);
      return;
    }
    logger.info("authenticated user: " + user.username);
    const loginState: ILoginState = {
      isAuthenticated: true,
      token: jwt.sign(loginForm, this.JWT_SECRET),
      user: {username: loginForm.username, password: loginForm.password, email: "", index: 0},
    };
    logger.info("created token: " + loginState.token);
    response.json(loginState);
  }

  public authenticateRequest(request: Request, response: Response, next: NextFunction): void {
    try {
      const token: string = this.getToken(this.getAuthorizationHeader(request));
      logger.info(token);
      jwt.verify(token, this.JWT_SECRET);
      logger.info(`token authorized: ${token}`);
      next();
    } catch (e) {
      logger.info(`token failed: ${e}`);
      response.sendStatus(401);
    }
  }

  private getAuthorizationHeader(request: any): string {
    return request.header("Authorization");
  }

  private getToken(authorizationHeader: string): string {
    logger.info("authorizationHeader: " + authorizationHeader);
    const parts: string[] = authorizationHeader.split(" ");
    if (parts.length === 2) {
      return parts[1];
    }
    return "";
  }
}
