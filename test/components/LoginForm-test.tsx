import {assert} from "chai";
import * as Debug from "debug";
import * as dotenv from "dotenv";
import {mount, ReactWrapper, shallow, ShallowWrapper} from "enzyme";
import * as fetchMock from "fetch-mock";
import {Formik} from "formik";
import * as React from "react";
import {Button, FormControl} from "react-bootstrap";
import Jwt from "../../src/api/Jwt";
import LoginForm, {ILoginForm} from "../../src/components/LoginForm";
import {ILoginState} from "../../src/reducers/LoginReducer";
import LoginApi from "../../src/api/LoginApi";
import {IntlProvider} from "react-intl";

Debug.enable("*");
const debug: Debug.IDebugger = Debug("LoginForm-test");
describe("LoginForm component", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
  });
  test.skip("should render login form", async () => {
    const loginWrapper: ShallowWrapper<any, ILoginForm> =
      shallow(<LoginForm />).dive();
    assert.equal(loginWrapper.find(FormControl).length, 2);
    assert.equal(loginWrapper.find(Button).length, 1);
  });
  // test("should change state", () => {
  test.skip("should change state", async (done) => {
    // @ts-ignore: Argument of type
    // const spy: SinonSpy = sinon.spy(LoginForm.prototype, "login");
    // LoginForm is rendered in two phases due to formik, hence use dive to shallow render
    const loginWrapper: ShallowWrapper<any, ILoginForm> =
      mount(<IntlProvider><LoginForm /></IntlProvider>);
    debug(loginWrapper.html());
    // username
    const formik: ShallowWrapper<any, any> = loginWrapper.find(Formik).at(0);
    let formControl: ShallowWrapper<any, any> = loginWrapper.find(FormControl).at(0);
    await formControl.simulate("change", {target: {value: "user1"}});
    // assert.equal(formik.prop("values").username, "user1");
    const props = formik.props();
    // assert.equal(loginWrapper.state().username, "user1");
    // password
    formControl = loginWrapper.find(FormControl).at(1);
    formControl.simulate("change", {target: {value: "password1"}});
    assert.equal(formik.prop("values").password, "user1");
    // assert.equal(loginWrapper.state().password, "password1");
    // // submit
    // TODO how to reset sinon.spy so that does not affect other tests?
    // await loginWrapper.find(Button).at(0).simulate("click");
    // assert.isTrue(spy.calledOnce);
    // spy.reset();
    // done();
  });
  test.skip("should dispatch login action", async (done) => {
    const loginState: ILoginState = {isAuthenticated: true, token: "token"};
    fetchMock.postOnce(LoginApi.getApiUrl(), loginState);
    const loginWrapper: ReactWrapper<any, any> =
      mount(<IntlProvider><LoginForm /></IntlProvider>);
    // username
    let formControl: ReactWrapper<any, any> = loginWrapper.find(FormControl).at(0);
    formControl.simulate("change", {target: {value: "user1"}});
    // assert.equal(loginWrapper.state().username, "user1");
    await formControl.simulate("change", {target: {value: "user1"}});
    // password
    formControl = loginWrapper.find(FormControl).at(1);
    await formControl.simulate("change", {target: {value: "password1"}});
    // await formControl.simulate("change", {target: {value: "user1"}});
    // submit
    await loginWrapper.find(Button).at(0).simulate("click");
    setTimeout(() => {
      assert.equal(sessionStorage.getItem(Jwt.JWT_TOKEN_KEY), "token");
      done();
    }, 100);
  });
});
