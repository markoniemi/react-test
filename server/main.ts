import createServer from "./server";
import createBackend, {createUser, deleteUsers} from "./backend";

// TODO set host and port as environment variables
const serverHost = "localhost";
const serverPort: number = 8080;
const backendHost = "localhost";
const backendPort: number = 5001;

createServer(serverHost, serverPort, backendHost, backendPort);
createBackend(backendHost, backendPort);
createUser({username: "user", email: "email", index: 0});
