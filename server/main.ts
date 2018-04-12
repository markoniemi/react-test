import * as dotenv from "dotenv";
import * as winston from "winston";
import createBackend, {createUser} from "./backend";
import createServer from "./server";

dotenv.config({path: "config/development.env"});
initLogs();
const serverHost: string = process.env.HOST;
const serverPort: number = parseInt(process.env.PORT, 10);
const backendHost: string = process.env.BACKEND_HOST;
const backendPort: number = parseInt(process.env.BACKEND_PORT, 10);

// TODO set log level from to .env file
createServer(serverHost, serverPort, backendHost, backendPort);
createBackend(backendHost, backendPort);
createUser({username: "user", email: "email", password: "password", index: 0});

function initLogs() {
  const logger = winston.configure({
    level: process.env.LOG_LEVEL,
    transports: [
      new (winston.transports.Console)(),
    ],
  });
}
