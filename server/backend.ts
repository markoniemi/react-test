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

export default function createBackend(host: string, port: number): Http.Server {
  const app: Express = express();
  userDatabase = new Datastore();
  app.use("/api/users", authenticate, expressRestResource({db: userDatabase}));
  app.use(express.urlencoded());
  app.use(express.json());
  app.post("/api/login", handleLogin);

  const httpServer: Http.Server = app.listen(port, () => {
    logger.info("Backend server runs at http://" + host + ":" + port);
  });

  return httpServer;
}

async function handleLogin(request: Request, response: Response, next: NextFunction): Promise<void> {
  const loginForm: ILoginForm = {username: request.body.username, password: request.body.password};
  logger.info("authenticating user: " + loginForm.username);
  const user: User = await findUser(loginForm.username);
  if (user == null) {
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

export function createUser(user: User): void {
  userDatabase.insert(user);
}

export function deleteUsers(): void {
  userDatabase.remove({}, {multi: true});
}

export async function findUser(username: string): Promise<User> {
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

function getAuthorizationHeader(request: any) {
  return request.header("Authorization");
}

function getToken(authorizationHeader: string): string {
  logger.info("authorizationHeader: " + authorizationHeader);
  const parts: string[] = authorizationHeader.split(" ");
  if (parts.length === 2) {
    return parts[1];
  }
  return "";
}

function authenticate(request: Request, response: Response, next: NextFunction): void {
  const token: string = getToken(getAuthorizationHeader(request));
  logger.info(token);
  if (jwt.verify(getToken(getAuthorizationHeader(request)), JWT_SECRET)) {
    logger.info(`token authorized: ${token}`);
    next();
  } else {
    // TODO throw an exception
    logger.info(`token failed: ${token}`);
  }
}
