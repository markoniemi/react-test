import {assert} from "chai";
import * as dotenv from "dotenv";
import {shallow, ShallowWrapper} from "enzyme";
import * as sleep from "es7-sleep";
import * as fetchMock from "fetch-mock";
import * as React from "react";
import {Button, FormControl} from "react-bootstrap";
import {Store} from "react-redux";
import UserActions from "../../src/actions/UserActions";
import UserApi from "../../src/api/UserApi";
import EditUser, {IEditUser} from "../../src/components/EditUser";
import {UserContainer} from "../../src/components/UserContainer";
import User from "../../src/domain/User";
import store from "../../src/stores/Store";
import {user1} from "../userList";

describe("EditUser component", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(UserActions.resetUsers());
  });
  test("should render a user", () => {
    const userWrapper: ShallowWrapper<IEditUser, Partial<User>> = shallow(<EditUser user={user1}/>);

    assert.equal(userWrapper.find(FormControl).at(0).prop("defaultValue"), "1", "Expected to have value");
    assert.equal(userWrapper.find(FormControl).at(1).prop("defaultValue"), "user1", "Expected to have value");
    assert.equal(userWrapper.find(FormControl).at(2).prop("defaultValue"), "email1", "Expected to have value");
  });
  test("should not create error with empty user", () => {
    const emptyUser = new User();
    const userWrapper: ShallowWrapper<IEditUser, Partial<User>> = shallow(<EditUser user={emptyUser}/>);
    assert.equal(userWrapper.state("index"), 0);
    assert.equal(userWrapper.state("username"), "");
  });
  test("should edit a user", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    const editUserWrapper: ShallowWrapper<IEditUser, Partial<User>> = shallow(
      <EditUser
        user={user1}
        saveUser={UserContainer.saveUser}
      />);
    // username
    let formControl: ShallowWrapper<any, any> = editUserWrapper.find(FormControl).at(1);
    assert.equal(formControl.prop("defaultValue"), "user1");
    formControl.simulate("change", {target: {value: "newUsername"}});
    assert.equal(editUserWrapper.state().username, "newUsername");
    // email
    formControl = editUserWrapper.find(FormControl).at(2);
    assert.equal(formControl.prop("defaultValue"), "email1");
    formControl.simulate("change", {target: {value: "newEmail"}});
    assert.equal(editUserWrapper.state().email, "newEmail");
    await editUserWrapper.find(Button).at(0).simulate("click");
    await sleep(100);
    assert.equal(store.getState().users.length, 1, "store should have a new user");
    assert.equal(store.getState().users[0].username, "newUsername");
    assert.equal(store.getState().users[0].email, "newEmail");
    done();
  });
  test("edit with keyboard", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    const editUserWrapper: ShallowWrapper<IEditUser, Partial<User>> = shallow(
      <EditUser
        user={user1}
        saveUser={UserContainer.saveUser}
      />);
    // username
    let formControl: ShallowWrapper<any, any> = editUserWrapper.find(FormControl).at(1);
    assert.equal(formControl.prop("defaultValue"), "user1");
    formControl.simulate("change", {target: {value: "newUsername"}});
    assert.equal(editUserWrapper.state().username, "newUsername");
    // email
    formControl = editUserWrapper.find(FormControl).at(2);
    assert.equal(formControl.prop("defaultValue"), "email1");
    formControl.simulate("change", {target: {value: "newEmail"}});
    assert.equal(editUserWrapper.state().email, "newEmail");
    await formControl.simulate("keyPress", {key: "Enter"});
    await sleep(100);
    assert.equal(store.getState().users.length, 1, "store should have a new user");
    assert.equal(store.getState().users[0].username, "newUsername");
    assert.equal(store.getState().users[0].email, "newEmail");
    done();
  });
});
