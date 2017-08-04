import * as express from "express";
import * as expressRestResource from "express-rest-generator";
import * as Datastore from "nedb";
import User from "../src/domain/User";

export default function createBackend(host: string, port: number) {
  const app = express();
  const userDatabase = new Datastore();
  const user: User = {username: "user", email: "email", index: 0};
  userDatabase.insert(user);
  app.use("/api/users", expressRestResource({db: userDatabase}));

  app.listen(port, () => {
    // noinspection TsLint
    console.log("Backend server runs at http://" + host + ":" + port);
  });
}
