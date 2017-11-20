import {assert} from "chai";
import {shallow, ShallowWrapper} from "enzyme";
import * as fetchMock from "fetch-mock";
import * as React from "react";
import {Button, FormControl} from "react-bootstrap";
import UserActions from "../../src/actions/UserActions";
import UserRow, {IUserRow, IUserRowState} from "../../src/components/UserRow";
import User from "../../src/domain/User";
import store from "../../src/stores/Store";
const user1 = {username: "user1", email: "email", index: 0, _id: "1"};
describe("UserRow component", () => {
  beforeEach(() => {
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(UserActions.resetUsers());
  });
  test("should render a user", () => {
    const userWrapper = shallow(<UserRow user={user1}/>) as ShallowWrapper<IUserRow, IUserRowState>;

    assert.equal(userWrapper.find("tr").length, 1, "Expected to have element <tr>");
    assert.equal(userWrapper.find("td").at(1).text(), "user1", "Expected to have element <td>");
    assert.equal(userWrapper.find("td").at(2).text(), "email", "Expected to have element <td>");
  });
  test("should not create error with empty user", () => {
    const emptyUser = new User();
    const userWrapper = shallow(<UserRow user={emptyUser}/>) as ShallowWrapper<IUserRow, IUserRowState>;
    assert.equal(userWrapper.state().index, 0);
    assert.equal(userWrapper.state().username, "");
  });
  test("should edit a user", async (done) => {
    fetchMock.postOnce("http://localhost:8080/api/users/", user1);
    fetchMock.putOnce("http://localhost:8080/api/users/1", 200);
    await store.dispatch(UserActions.addUser(user1));
    assert.equal(store.getState().users.length, 1, "store should have a new user");
    const userWrapper = shallow(<UserRow user={user1}/>);

    assert.equal(userWrapper.state().editing, false);
    userWrapper.find("td").at(1).simulate("click");
    assert.equal(userWrapper.state().editing, true);
    assert.equal(userWrapper.find(FormControl).length, 2);
    // username
    const usernameWrapper = userWrapper.find(FormControl).at(0).shallow();
    assert.equal(usernameWrapper.prop("defaultValue"), "user1");
    usernameWrapper.simulate("change", {target: {value: "newUsername"}});
    assert.equal(userWrapper.state().username, "newUsername");
    // email
    const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
    assert.equal(emailWrapper.prop("defaultValue"), "email");
    emailWrapper.simulate("change", {target: {value: "newEmail"}});
    assert.equal(userWrapper.state().email, "newEmail");
    // finish editing with button
    await userWrapper.find(Button).at(0).simulate("click");
    assert.equal(userWrapper.state().editing, false);
    setTimeout((store) => {
      assert.equal(store.getState().users.length, 1, "store should have a new user");
      assert.equal(store.getState().users[0].username, "newUsername");
      assert.equal(store.getState().users[0].email, "newEmail");
      done();
    }, 1000, store);
  });
  test("should edit a user with keyboard", async (done) => {
    fetchMock.postOnce("http://localhost:8080/api/users/", user1);
    fetchMock.putOnce("http://localhost:8080/api/users/1", 200);
    await store.dispatch(UserActions.addUser(user1));
    const userWrapper = shallow(<UserRow user={user1}/>);

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
    assert.equal(emailWrapper.prop("defaultValue"), "email");
    emailWrapper.simulate("change", {target: {value: "newEmail"}});
    assert.equal(userWrapper.state().email, "newEmail");
    // finish editing with enter
    await emailWrapper.find("input").at(0).simulate("keyPress", {key: "Enter"});
    assert.equal(userWrapper.state().editing, false, "should enter view only state");
    setTimeout((store) => {
      assert.equal(store.getState().users.length, 1, "store should have a new user");
      assert.equal(store.getState().users[0].username, "newUsername");
      assert.equal(store.getState().users[0].email, "newEmail");
      done();
    }, 1000, store);
  });
  test("should delete a user", async (done) => {
    fetchMock.postOnce("http://localhost:8080/api/users/", user1);
    fetchMock.deleteOnce("http://localhost:8080/api/users/1", 200);
    await store.dispatch(UserActions.addUser(user1));
    const userWrapper = shallow(<UserRow user={user1}/>);

    await userWrapper.find("Button").at(1).simulate("click");
    setTimeout((store) => {
      assert.equal(store.getState().users.length, 0);
      done();
    }, 1000, store);
  });
});
