import * as express from "express";
import * as expressRestResource from "express-rest-generator";
import * as Datastore from "nedb";
import User from "../src/domain/User";

let userDatabase;

export default function createBackend(host: string, port: number) {
  const app = express();
  userDatabase = new Datastore();
  app.use("/api/users", expressRestResource({db: userDatabase}));

  app.listen(port, () => {
    // noinspection TsLint
    console.log("Backend server runs at http://" + host + ":" + port);
  });
}

export function createUser(user: User) {
  userDatabase.insert(user);
}

export function deleteUsers(): void {
  userDatabase.remove({}, {multi: true});
}
