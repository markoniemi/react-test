import * as express from "express";
import {Express, NextFunction, Request, Response} from "express";
import * as expressRestResource from "express-rest-generator";
import * as Http from "http";
import * as jwt from "jsonwebtoken";
import * as Datastore from "nedb";
import * as logger from "winston";
import {ILoginForm} from "../src/components/LoginForm";
import User from "../src/domain/User";
import {ILoginState} from "../src/reducers/LoginReducer";

let userDatabase;

const JWT_SECRET: string = "JWT_SECRET";

export default class Backend {
  private readonly host: string;
  private readonly port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.authenticate = this.authenticate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  public start(): Http.Server {
    const app: Express = express();
    userDatabase = new Datastore();
    app.use("/api/users", this.authenticate, expressRestResource({db: userDatabase}));
    app.use(express.urlencoded());
    app.use(express.json());
    app.post("/api/login", this.handleLogin);

    const httpServer: Http.Server = app.listen(this.port, () => {
      logger.info("Backend server runs at http://" + this.host + ":" + this.port);
    });

    return httpServer;
  }

  private async handleLogin(request: Request, response: Response, next: NextFunction): Promise<void> {
    const loginForm: ILoginForm = {username: request.body.username, password: request.body.password};
    logger.info("authenticating user: " + loginForm.username);
    const user: User = await this.findUser(loginForm.username);
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

  public createUser(user: User): void {
    userDatabase.insert(user);
  }

  public deleteUsers(): void {
    userDatabase.remove({}, {multi: true});
  }

  public async findUser(username: string): Promise<User> {
    // nedb uses callback instead of promises, wrap findOne and return Promise
    return new Promise<User>((resolve, reject) => {
      userDatabase.findOne({username}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc as User);
        }
      });
    });
  }

  private getAuthorizationHeader(request: any) {
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
}
