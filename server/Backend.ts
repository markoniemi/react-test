import * as express from "express";
import {Express, NextFunction, Request, Response} from "express";
import * as Http from "http";
import * as jwt from "jsonwebtoken";
import * as logger from "winston";
import {ILoginForm} from "../src/components/LoginForm";
import User from "../src/domain/User";
import {ILoginState} from "../src/reducers/LoginReducer";
import UserService from "./UserService";
// TODO move into class
const JWT_SECRET: string = "JWT_SECRET";
// TODO split into UserService and AuthenticationService
export default class Backend {
  private userService: UserService;

  constructor(private host: string, private port: number) {
    this.userService = new UserService();
    this.authenticate = this.authenticate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  public start(): Http.Server {
    const app: Express = express();
    app.use("/api/users", this.authenticate, this.userService.getUserRepository());
    app.use(express.urlencoded());
    app.use(express.json());
    app.post("/api/login", this.handleLogin);

    const httpServer: Http.Server = app.listen(this.port, () => {
      logger.info("Backend server runs at http://" + this.host + ":" + this.port);
    });

    return httpServer;
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
      token: jwt.sign(loginForm, JWT_SECRET),
      user: {username: loginForm.username, password: loginForm.password, email: "", index: 0},
    };
    logger.info("created token: " + loginState.token);
    response.json(loginState);
  }

  private getAuthorizationHeader(request: any) {
    return request.header("Authorization");
  }

  // TODO move to JWT class
  private getToken(authorizationHeader: string): string {
    logger.info("authorizationHeader: " + authorizationHeader);
    const parts: string[] = authorizationHeader.split(" ");
    if (parts.length === 2) {
      return parts[1];
    }
    return "";
  }

  private authenticate(request: Request, response: Response, next: NextFunction): void {
    const token: string = this.getToken(this.getAuthorizationHeader(request));
    logger.info(token);
    if (jwt.verify(this.getToken(this.getAuthorizationHeader(request)), JWT_SECRET)) {
      logger.info(`token authorized: ${token}`);
      next();
    } else {
      // TODO throw an exception
      logger.info(`token failed: ${token}`);
    }
  }

  public getUserService(): UserService {
    return this.userService;
  }
}
