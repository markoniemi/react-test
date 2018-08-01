import {assert} from "chai";
import * as dotenv from "dotenv";
import {Response} from "express";
import "isomorphic-fetch";
import * as httpMocks from "node-mocks-http";
import {MockResponse} from "node-mocks-http";
import Backend from "../server/Backend";
import {ILoginForm} from "../src/components/LoginForm";
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
    await backend.createUser(user1);
    let user: User = await backend.findUser(user1.username);
    assert(user.username, user1.username);
    await backend.deleteUsers();
    user = await backend.findUser(user1.username);
    assert.isNull(user);
    done();
  });
  test("handlelogin", async (done) => {
    const backend: Backend = new Backend(backendHost, backendPort);
    await backend.createUser(user1);
    const loginForm: ILoginForm = {username: user1.username, password: user1.password};
    const request = httpMocks.createRequest({body: loginForm});
    const response: MockResponse<Response> = httpMocks.createResponse();
    await backend.handleLogin(request, response, null);
    assert.equal(200, response.statusCode);
    const loginState: ILoginState = JSON.parse(response._getData());
    assert.isTrue(loginState.isAuthenticated);
    await backend.deleteUsers();
    done();
  });
});
