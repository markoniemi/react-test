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
import * as httpMocks from "node-mocks-http";
import {Express, NextFunction, Request, Response} from "express";
import sinon = require("sinon");


const backendHost = process.env.BACKEND_HOST;
const backendPort = parseInt(process.env.BACKEND_PORT, 10);
describe("Backend", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test("create user", async (done) => {
    const backend: Backend = new Backend(backendHost, backendPort);
    await backend.createUser(user1);
    let user: User = await backend.findUser(user1.username);
    assert(user.username, user1.username);
    await backend.deleteUsers();
    user = await backend.findUser(user1.username);
    assert.isNull(user);
    done();
  });
  test.skip("handlelogin", async (done) => {
    const backend: Backend = new Backend(backendHost, backendPort);
    await backend.createUser(user1);
    const request = httpMocks.createRequest({body: {username: user1.username, password: user1.password}});
    let response: Response = httpMocks.createResponse();
    // const resp: Response = await backend.handleLogin(request, response, null);
    assert.equal(200, response.statusCode);
    const loginState: ILoginState = response.json() as any;
    assert.isTrue(loginState.isAuthenticated);
    await backend.deleteUsers();
    done();
  });
});
