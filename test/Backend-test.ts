import {assert} from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import Backend from "../server/Backend";
import User from "../src/domain/User";
import {user1} from "./userList";

const backendHost = process.env.BACKEND_HOST;
const backendPort = parseInt(process.env.BACKEND_PORT, 10);
describe("Backend", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test("create user", async (done) => {
    const backend: Backend = new Backend(backendHost, backendPort);
    await backend.getUserService().save(user1);
    let user: User = await backend.getUserService().findByUsername(user1.username);
    assert(user.username, user1.username);
    await backend.getUserService().delete();
    user = await backend.getUserService().findByUsername(user1.username);
    assert.isNull(user);
    done();
  });
});
