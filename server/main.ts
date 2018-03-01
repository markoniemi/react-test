import * as dotenv from "dotenv";
import createBackend, {createUser} from "./backend";
import createServer from "./server";

dotenv.config({path: "config/development.env"});
const serverHost: string = process.env.HOST;
const serverPort: number = process.env.PORT;
const backendHost: string = process.env.BACKEND_HOST;
const backendPort: number = process.env.BACKEND_PORT;

// TODO set log level from to .env file
createServer(serverHost, serverPort, backendHost, backendPort);
createBackend(backendHost, backendPort);
createUser({username: "user", email: "email", password: "password", index: 0});
