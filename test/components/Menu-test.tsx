import {assert} from "chai";
import {shallow, ShallowWrapper} from "enzyme";
import "isomorphic-fetch";
import * as React from "react";
import {Button, Navbar} from "react-bootstrap";
import * as sinon from "sinon";
import {SinonSpy} from "sinon";
import {ILoginForm} from "../../src/components/LoginForm";
import Menu from "../../src/components/Menu";

describe("Menu component", () => {
  test("render", () => {
    const wrapper: ShallowWrapper<any, any> = shallow(<Menu/>);
    assert.isNotNull(wrapper.find(Navbar), "Expected to have component Navbar");
    assert.isNotNull(wrapper.find(Button), "Expected to have component Button");
  });
  test("Logout button should call logout", () => {
    const spy: SinonSpy = sinon.spy(Menu, "logout");
    const wrapper: ShallowWrapper<any, any> = shallow(<Menu/>);
    assert.isNotNull(wrapper.find(Menu), "Expected to have component Menu");
    wrapper.find(Button).at(0).simulate("click");
    assert.isTrue(spy.calledOnce);
  });
});
