import {assert} from "chai";
import * as dotenv from "dotenv";
import {Response} from "express";
import "isomorphic-fetch";
import * as jwt from "jsonwebtoken";
import * as httpMocks from "node-mocks-http";
import {MockResponse} from "node-mocks-http";
import {SinonSpy} from "sinon";
import AuthenticationService from "../server/AuthenticationService";
import UserService from "../server/UserService";
import {ILoginForm} from "../src/components/LoginForm";
import {ILoginState} from "../src/reducers/LoginReducer";
import {user1} from "./userList";
import sinon = require("sinon");

let userService: UserService;
let authenticationService: AuthenticationService;
let response: MockResponse<Response>;
let next: SinonSpy;

describe("AuthenticationService", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    userService = new UserService();
    authenticationService = new AuthenticationService(userService);
    response = httpMocks.createResponse();
    next = sinon.stub();
  });
  test("handleLogin", async (done) => {
    await userService.save(user1);
    const loginForm: ILoginForm = {username: user1.username, password: user1.password};
    const request = httpMocks.createRequest({body: loginForm});
    await authenticationService.handleLogin(request, response, next);
    assert.equal(200, response.statusCode);
    const loginState: ILoginState = JSON.parse(response._getData());
    assert.isTrue(loginState.isAuthenticated);
    await userService.delete();
    done();
  });
  test("handleLogin should fail with nonexistent user", async (done) => {
    const loginForm: ILoginForm = {username: "", password: ""};
    const request = httpMocks.createRequest({body: loginForm});
    await authenticationService.handleLogin(request, response, next);
    assert.equal(402, response.statusCode);
    done();
  });
  test("authenticateRequest", async (done) => {
    const loginForm: ILoginForm = {username: user1.username, password: user1.password};
    const jwtToken = jwt.sign(loginForm, "JWT_SECRET");
    const request = httpMocks.createRequest({
      headers: {Authorization: `Bearer ${jwtToken}`},
    });
    authenticationService.authenticateRequest(request, response, next);
    assert.equal(200, response.statusCode);
    assert.isTrue(next.calledOnce);
    done();
  });
  test("authenticateRequest should fail with no jwt header", async (done) => {
    const request = httpMocks.createRequest();
    authenticationService.authenticateRequest(request, response, next);
    assert.equal(401, response.statusCode);
    assert.isFalse(next.called);
    done();
  });
});
