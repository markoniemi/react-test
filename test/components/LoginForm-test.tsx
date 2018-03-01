import {assert} from "chai";
import * as dotenv from "dotenv";
import {shallow, ShallowWrapper} from "enzyme";
import * as fetchMock from "fetch-mock";
import * as React from "react";
import {Button, FormControl} from "react-bootstrap";
import Jwt from "../../src/api/Jwt";
import LoginForm, {ILoginForm} from "../../src/components/LoginForm";
import {ILoginState} from "../../src/reducers/LoginReducer";

const loginApiUrl = "http://localhost:8080/api/login/";
describe("LoginForm component", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
  });
  test("should render login form", async () => {
    const loginWrapper: ShallowWrapper<any, ILoginForm> =
      shallow(<LoginForm />);
    assert.equal(loginWrapper.find(FormControl).length, 2);
    assert.equal(loginWrapper.find(Button).length, 1);
  });
  test("should change state", () => {
  // test("should change state", async (done) => {
    // @ts-ignore: Argument of type
    // const spy: SinonSpy = sinon.spy(LoginForm.prototype, "login");
    const loginWrapper: ShallowWrapper<any, ILoginForm> =
      shallow(<LoginForm />);
    // username
    let formControl: ShallowWrapper<any, any> = loginWrapper.find(FormControl).at(0);
    formControl.simulate("change", {target: {value: "user1"}});
    assert.equal(loginWrapper.state().username, "user1");
    // password
    formControl = loginWrapper.find(FormControl).at(1);
    formControl.simulate("change", {target: {value: "password1"}});
    assert.equal(loginWrapper.state().password, "password1");
    // // submit
    // TODO how to reset sinon.spy so that does not affect other tests?
    // await loginWrapper.find(Button).at(0).simulate("click");
    // assert.isTrue(spy.calledOnce);
    // spy.reset();
    // done();
  });
  test("should dispatch login action", async (done) => {
    const loginState: ILoginState = {isAuthenticated: true, token: "token"};
    fetchMock.postOnce(loginApiUrl, loginState);
    const loginWrapper: ShallowWrapper<any, ILoginForm> =
      shallow(<LoginForm />);
    // username
    let formControl: ShallowWrapper<any, any> = loginWrapper.find(FormControl).at(0);
    formControl.simulate("change", {target: {value: "user1"}});
    assert.equal(loginWrapper.state().username, "user1");
    // password
    formControl = loginWrapper.find(FormControl).at(1);
    formControl.simulate("change", {target: {value: "password1"}});
    // submit
    await loginWrapper.find(Button).at(0).simulate("click");
    setTimeout(() => {
      assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), "token");
      done();
    }, 100);
  });
});
