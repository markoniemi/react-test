import {assert} from "chai";
import * as dotenv from "dotenv";
import "isomorphic-fetch";
import UserService from "../server/UserService";
import User from "../src/domain/User";
import {user1} from "./userList";

describe("UserService", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test("save/delete/findByUsername", async (done) => {
    const userService: UserService = new UserService();
    await userService.save(user1);
    let user: User = await userService.findByUsername(user1.username);
    assert(user.username, user1.username);
    await userService.delete();
    user = await userService.findByUsername(user1.username);
    assert.isNull(user);
    done();
  });
});
