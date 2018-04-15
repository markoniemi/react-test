import {assert} from "chai";
import * as dotenv from "dotenv";
import * as fetchMock from "fetch-mock";
import {default as LoginActions, LoginActionType} from "../../src/actions/LoginActions";
import UserActions from "../../src/actions/UserActions";
import Jwt from "../../src/api/Jwt";
import {ILoginState} from "../../src/reducers/LoginReducer";
import store from "../../src/stores/Store";
import {user1} from "../userList";

const loginApiUrl = "http://localhost:8080/api/login/";
describe("LoginActions", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
  });
  test("successful login", async (done) => {
    const loginState: ILoginState = {isAuthenticated: true, token: "token"};
    fetchMock.postOnce(loginApiUrl, loginState);
    await store.dispatch(LoginActions.login(user1));
    assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), "token");
    done();
  });
  test("logout", async (done) => {
    const loginState: ILoginState = {isAuthenticated: true, token: "token"};
    fetchMock.postOnce(loginApiUrl, loginState);
    await store.dispatch(LoginActions.login(user1));
    assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), "token");
    await store.dispatch(LoginActions.logout());
    assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), null);
    done();
  });
  test("failed login", async (done) => {
    fetchMock.postOnce(loginApiUrl, 402);
    await store.dispatch(LoginActions.login(user1));
    assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), null);
    done();
  });
});
