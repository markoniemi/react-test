import {assert} from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import * as logger from "winston";
import Backend from "../server/Backend";
import Jwt from "../src/api/Jwt";
import LoginApi from "../src/api/LoginApi";
import UserApi from "../src/api/UserApi";
import User from "../src/domain/User";
import {ILoginState} from "../src/reducers/LoginReducer";
import {user1} from "./userList";

const backendHost = process.env.BACKEND_HOST;
const backendPort = parseInt(process.env.BACKEND_PORT, 10);
describe("Backend", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test("create user", async (done) => {
    const backend: Backend = new Backend(backendHost, backendPort);
    backend.createUser(user1);
    const user: User = await backend.findUser(user1.username);
    assert(user.username, user1.username);
    await backend.deleteUsers();
    done();
  });
  test.skip("failed login", async (done) => {
    try {
      const loginState: ILoginState = await LoginApi.login({username: "invalid", password: "invalid"});
      assert.fail();
    } catch (e) {
      done();
    }
  });
});
