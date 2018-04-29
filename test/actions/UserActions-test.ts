import {assert} from "chai";
import * as dotenv from "dotenv";
import * as fetchMock from "fetch-mock";
import UserActions from "../../src/actions/UserActions";
import store from "../../src/stores/Store";
import {user1, user2} from "../userList";
import UserApi from "../../src/api/UserApi";

describe("UserActions", () => {
  beforeEach(() => {
    dotenv.config({path: "config/development.env"});
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(UserActions.resetUsers());
  });
  test("should fetch users from store", async (done) => {
    fetchMock.getOnce(UserApi.getApiUrl(), [user1]);
    await store.dispatch(UserActions.fetchUsers());
    assert.equal(store.getState().users.length, 1);
    done();
  });
  test("should add user in store", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.postOnce(UserApi.getApiUrl(), user2);
    await store.dispatch(UserActions.addUser(user1));
    await store.dispatch(UserActions.addUser(user2));
    assert.equal(store.getState().users.length, 2);
    done();
  });
  test("should remove user from store", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.postOnce(UserApi.getApiUrl(), user2);
    fetchMock.deleteOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    await store.dispatch(UserActions.addUser(user2));
    assert.equal(store.getState().users.length, 2);
    await store.dispatch(UserActions.removeUser(user1));
    assert.equal(store.getState().users.length, 1);
    done();
  });
  test("should change username in store", async (done) => {
    fetchMock.postOnce(UserApi.getApiUrl(), user1);
    fetchMock.putOnce(UserApi.getApiUrl() + "1", 200);
    await store.dispatch(UserActions.addUser(user1));
    await store.dispatch(UserActions.editUser({username: "username", email: "email", password: "password", index: 0, _id: "1"}));
    assert.equal(store.getState().users[0].username, "username");
    done();
  });
});
