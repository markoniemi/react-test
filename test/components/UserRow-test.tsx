import {assert} from "chai";
import * as dotenv from "dotenv";
import {shallow, ShallowWrapper} from "enzyme";
import * as sleep from "es7-sleep";
import * as fetchMock from "fetch-mock";
import * as React from "react";
import {Button, FormControl} from "react-bootstrap";
import UserActions from "../../src/actions/UserActions";
import UserApi from "../../src/api/UserApi";
import UserRow, {IUserRow, IUserRowState} from "../../src/components/UserRow";
import {UsersContainer} from "../../src/components/UsersContainer";
import User from "../../src/domain/User";
import store from "../../src/stores/Store";
import {user1} from "../userList";

describe("UserRow component", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(UserActions.resetUsers());
  });
  test("should render a user", () => {
    const userWrapper: ShallowWrapper<IUserRow, IUserRowState> = shallow(
      <UserRow
        user={user1}
        editUser={UsersContainer.editUser}
        saveUser={UsersContainer.saveUser}
        deleteUser={UsersContainer.deleteUser}
      />);
    assert.equal(userWrapper.find("tr").length, 1, "Expected to have element <tr>");
    assert.equal(userWrapper.find("td").at(1).text(), "user1", "Expected to have element <td>");
    assert.equal(userWrapper.find("td").at(2).text(), "email1", "Expected to have element <td>");
  });
  test("should not create error with empty user", () => {
    const emptyUser = new User();
    const userWrapper: ShallowWrapper<IUserRow, IUserRowState> = shallow(
      <UserRow
        user={emptyUser}
        editUser={UsersContainer.editUser}
        saveUser={UsersContainer.saveUser}
        deleteUser={UsersContainer.deleteUser}
      />);
    assert.equal(userWrapper.state().index, 0);
    assert.equal(userWrapper.state().username, "");
  });
  test("should edit a user", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    assert.equal(store.getState().users.length, 1, "store should have a new user");
    const userWrapper: ShallowWrapper<IUserRow, IUserRowState> = shallow(
      <UserRow
        user={user1}
        editUser={UsersContainer.editUser}
        saveUser={UsersContainer.saveUser}
        deleteUser={UsersContainer.deleteUser}
      />);
    assert.equal(userWrapper.state().editing, false);
    userWrapper.find("td").at(1).simulate("click");
    assert.equal(userWrapper.state().editing, true);
    assert.equal(userWrapper.find(FormControl).length, 3);
    // username
    const usernameWrapper = userWrapper.find(FormControl).at(0).shallow();
    assert.equal(usernameWrapper.prop("defaultValue"), "user1");
    usernameWrapper.simulate("change", {target: {value: "newUsername"}});
    assert.equal(userWrapper.state().username, "newUsername");
    // email
    const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
    assert.equal(emailWrapper.prop("defaultValue"), "email1");
    emailWrapper.simulate("change", {target: {value: "newEmail"}});
    assert.equal(userWrapper.state().email, "newEmail");
    // password
    const passwordWrapper = userWrapper.find(FormControl).at(2).shallow();
    assert.equal(passwordWrapper.prop("defaultValue"), "password1");
    passwordWrapper.simulate("change", {target: {value: "newPassword"}});
    assert.equal(userWrapper.state().password, "newPassword");
    // finish editing with button
    await userWrapper.find(Button).at(0).simulate("click");
    assert.equal(userWrapper.state().editing, false);
    await sleep(1000);
    assert.equal(store.getState().users.length, 1, "store should have a new user");
    assert.equal(store.getState().users[0].username, "newUsername");
    assert.equal(store.getState().users[0].email, "newEmail");
    done();
  });
  test("should edit a user with keyboard", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    const userWrapper: ShallowWrapper<IUserRow, IUserRowState> = shallow(
      <UserRow
        user={user1}
        editUser={UsersContainer.editUser}
        saveUser={UsersContainer.saveUser}
        deleteUser={UsersContainer.deleteUser}
      />);
    assert.equal(userWrapper.state().editing, false, "should not be in editing state");
    // start edit by clicking email
    userWrapper.find("td").at(1).simulate("click");
    assert.equal(userWrapper.state().editing, true, "should enter editing state");
    // username
    const usernameWrapper = userWrapper.find(FormControl).at(0).shallow();
    assert.equal(usernameWrapper.prop("defaultValue"), "user1");
    usernameWrapper.simulate("change", {target: {value: "newUsername"}});
    assert.equal(userWrapper.state().username, "newUsername");
    // email
    const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
    assert.equal(emailWrapper.prop("defaultValue"), "email1");
    emailWrapper.simulate("change", {target: {value: "newEmail"}});
    assert.equal(userWrapper.state().email, "newEmail");
    // finish editing with enter
    await emailWrapper.find("input").at(0).simulate("keyPress", {key: "Enter"});
    assert.equal(userWrapper.state().editing, false, "should enter view only state");
    await sleep(1000);
    assert.equal(store.getState().users.length, 1, "store should have a new user");
    assert.equal(store.getState().users[0].username, "newUsername");
    assert.equal(store.getState().users[0].email, "newEmail");
    done();
  });
  test("should delete a user", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.deleteOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    const userWrapper: ShallowWrapper<IUserRow, IUserRowState> = shallow(
      <UserRow
        user={user1}
        editUser={UsersContainer.editUser}
        saveUser={UsersContainer.saveUser}
        deleteUser={UsersContainer.deleteUser}
      />);
    await userWrapper.find("Button").at(1).simulate("click");
    await sleep(1000);
    assert.equal(store.getState().users.length, 0);
    done();
  });
});
