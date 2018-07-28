import {assert} from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import * as logger from "winston";
import Jwt from "../src/api/Jwt";
import LoginApi from "../src/api/LoginApi";
import UserApi from "../src/api/UserApi";
import User from "../src/domain/User";
import {ILoginState} from "../src/reducers/LoginReducer";
import {user1} from "./userList";

describe("Application", async () => {
  beforeAll(async () => {
    await delay();
  });
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  describe("Login", () => {
    test("successful login", async (done) => {
      const loginState: ILoginState = await LoginApi.login({username: "user", password: "password"});
      assert.isTrue(loginState.isAuthenticated);
      await LoginApi.logout({username: "user", email: "email", password: "password", index: 0});
      Jwt.clearToken();
      done();
    });
    test("failed login", async (done) => {
      try {
        const loginState: ILoginState = await LoginApi.login({username: "invalid", password: "invalid"});
        assert.fail();
      } catch (e) {
        done();
      }
    });
  });
  describe("User", () => {
    test("add and remove user", async (done) => {
      const loginState: ILoginState = await LoginApi.login({username: "user", password: "password"});
      Jwt.setToken(loginState.token);
      await UserApi.addUser(user1);
      let users: User[] = await UserApi.fetchUsers();
      assert.equal(2, users.length);
      await UserApi.removeUser(user1);
      users = await UserApi.fetchUsers();
      assert.equal(1, users.length);
      await LoginApi.logout({username: "user", email: "email", password: "password", index: 0});
      Jwt.clearToken();
      done();
    });
  });
});

async function delay(): Promise<void> {
  setTimeout(() => {
    return logger.info("wait...");
  }, 20000);
}
