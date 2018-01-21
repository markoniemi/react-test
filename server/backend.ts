import * as express from "express";
import {Express} from "express";
import * as expressRestResource from "express-rest-generator";
import * as Http from "http";
import * as Datastore from "nedb";
import * as logger from "winston";
import User from "../src/domain/User";

let userDatabase;

export default function createBackend(host: string, port: number): Http.Server {
  const app: Express = express();
  userDatabase = new Datastore();
  app.use("/api/users", expressRestResource({db: userDatabase}));

  const httpServer: Http.Server = app.listen(port, () => {
    logger.info("Backend server runs at http://" + host + ":" + port);
  });

  return httpServer;
}

export function createUser(user: User) {
  userDatabase.insert(user);
}

export function deleteUsers(): void {
  userDatabase.remove({}, {multi: true});
}
