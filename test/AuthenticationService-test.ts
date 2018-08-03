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

describe("AuthenticationService", async () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
  });
  test("handlelogin", async (done) => {
    const userService: UserService = new UserService();
    const authenticationService: AuthenticationService = new AuthenticationService(userService);
    await userService.save(user1);
    const loginForm: ILoginForm = {username: user1.username, password: user1.password};
    const request = httpMocks.createRequest({body: loginForm});
    const response: MockResponse<Response> = httpMocks.createResponse();
    await authenticationService.handleLogin(request, response, null);
    assert.equal(200, response.statusCode);
    const loginState: ILoginState = JSON.parse(response._getData());
    assert.isTrue(loginState.isAuthenticated);
    await userService.delete();
    done();
  });
  test("authenticateRequest", async (done) => {
    const next: SinonSpy = sinon.stub();
    const userService: UserService = new UserService();
    const authenticationService: AuthenticationService = new AuthenticationService(userService);
    const loginForm: ILoginForm = {username: user1.username, password: user1.password};
    const jwtToken = jwt.sign(loginForm, "JWT_SECRET");
    const request = httpMocks.createRequest({
      headers: {Authorization: `Bearer ${jwtToken}`},
    });
    const response: MockResponse<Response> = httpMocks.createResponse();
    await authenticationService.authenticateRequest(request, response, next);
    assert.equal(200, response.statusCode);
    assert.isTrue(next.calledOnce);
    done();
  });
});
