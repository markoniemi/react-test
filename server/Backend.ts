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
// TODO move into class
let userDatabase;
// TODO move into class
const JWT_SECRET: string = "JWT_SECRET";
// TODO split into UserService and AuthenticationService
export default class Backend {
  // TODO define type
  private userRepository: any;
  constructor(private host: string, private port: number) {
    this.authenticate = this.authenticate.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    userDatabase = new Datastore();
    this.userRepository = expressRestResource({db: userDatabase});
  }

  public start(): Http.Server {
    const app: Express = express();
    app.use("/api/users", this.authenticate, this.userRepository);
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
    response.status(200).contentType("application/json").send(loginState);
    // response.json(loginState);
  }

  // TODO rename -> saveUser/addUser
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
}
