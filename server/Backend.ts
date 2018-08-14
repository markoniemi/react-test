import * as express from "express";
import {Express} from "express";
import * as Http from "http";
import * as logger from "winston";
import AuthenticationService from "./AuthenticationService";
import UserService from "./UserService";

export default class Backend {
  private readonly userService: UserService;
  private readonly authenticationService: AuthenticationService;
  private server: Http.Server;

  constructor(private readonly host: string, private readonly port: number) {
    this.userService = new UserService();
    this.authenticationService = new AuthenticationService(this.userService);
  }

  public start(): Http.Server {
    const app: Express = express();
    app.use("/api/users", this.authenticationService.authenticateRequest, this.userService.getUserRepository());
    app.use(express.urlencoded());
    app.use(express.json());
    app.post("/api/login", this.authenticationService.handleLogin);
    this.server = app.listen(this.port, () => {
      logger.info(`Backend server runs at http://${this.host}:${this.port}`);
    });
    return this.server;
  }

  public async stop(): Promise<void> {
    await this.server.close();
  }

  public getUserService(): UserService {
    return this.userService;
  }
}
