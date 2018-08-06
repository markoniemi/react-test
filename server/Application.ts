import * as dotenv from "dotenv";
import * as winston from "winston";
import Backend from "./Backend";
import Server from "./Server";

export default class Application {
  private readonly serverHost: string;
  private readonly serverPort: number;
  private readonly backendHost: string;
  private readonly backendPort: number;

  constructor() {
    dotenv.config({path: "config/development.env"});
    this.initLogs();
    this.serverHost = process.env.HOST;
    this.serverPort = parseInt(process.env.PORT, 10);
    this.backendHost = process.env.BACKEND_HOST;
    this.backendPort = parseInt(process.env.BACKEND_PORT, 10);
  }

  public start() {
    new Server(this.serverHost, this.serverPort, this.backendHost, this.backendPort).start();
    const backend = new Backend(this.backendHost, this.backendPort);
    backend.start();
    backend.getUserService().save({username: "user", email: "email", password: "password", index: 0});
  }

  private initLogs() {
    winston.configure({
      level: process.env.LOG_LEVEL,
      transports: [
        new winston.transports.Console(),
      ],
    });
  }
}

new Application().start();
