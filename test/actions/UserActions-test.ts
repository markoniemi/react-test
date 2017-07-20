import {assert} from "chai";
import * as fetchMock from "fetch-mock";
import store from "../../src/stores/Store";
import UserActions from "../../src/actions/UserActions";
const user1 = {username: "user1", email: "email", index: 0, _id: "1"};
const user2 = {username: "user2", email: "email", index: 1, _id: "2"};
describe("Action", () => {
  beforeEach(() => {
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(UserActions.resetUsers());
  });
  it("should add user in store", async (done) => {
    fetchMock.postOnce("http://localhost:8080/api/users/", user1);
    fetchMock.postOnce("http://localhost:8080/api/users/", user2);
    await store.dispatch(UserActions.addUser(user1));
    await store.dispatch(UserActions.addUser(user2));
    assert.equal(store.getState().users.length, 2);
    done();
  });
  it("should remove user from store", async (done) => {
    fetchMock.postOnce("http://localhost:8080/api/users/", user1);
    fetchMock.postOnce("http://localhost:8080/api/users/", user2);
    fetchMock.deleteOnce("http://localhost:8080/api/users/1", 200);
    await store.dispatch(UserActions.addUser(user1));
    await store.dispatch(UserActions.addUser(user2));
    assert.equal(store.getState().users.length, 2);
    await store.dispatch(UserActions.removeUser(user1));
    assert.equal(store.getState().users.length, 1);
    done();
  });
  it("should change username in store", async (done) => {
    fetchMock.postOnce("http://localhost:8080/api/users/", user1);
    fetchMock.putOnce("http://localhost:8080/api/users/1", 200);
    await store.dispatch(UserActions.addUser(user1));
    await store.dispatch(UserActions.editUser({username: "username", email: "email", index: 0, _id: "1"}));
    assert.equal(store.getState().users[0].username, "username");
    done();
  });
});