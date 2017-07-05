import {assert} from 'chai';
import fetchMock from 'fetch-mock';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';
const user1 = {username: 'user1', email: 'email', index: 0, _id: '1'};
const user2 = {username: 'user2', email: 'email', index: 1, _id: '2'};
describe('Action', () => {
  beforeEach(() => {
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(resetUsers());
  });
  it('should add user in store', async () => {
    fetchMock.postOnce('http://localhost:8080/api/users/', user1);
    fetchMock.postOnce('http://localhost:8080/api/users/', user2);
    await store.dispatch(addUser(user1));
    await store.dispatch(addUser(user2));
    assert.equal(store.getState().users.length, 2);
  });
  it('should remove user from store', async () => {
    fetchMock.postOnce('http://localhost:8080/api/users/', user1);
    fetchMock.postOnce('http://localhost:8080/api/users/', user2);
    fetchMock.deleteOnce('http://localhost:8080/api/users/1', 200);
    await store.dispatch(addUser(user1));
    await store.dispatch(addUser(user2));
    assert.equal(store.getState().users.length, 2);
    await store.dispatch(removeUser(user1));
    assert.equal(store.getState().users.length, 1);
  });
  it('should change username in store', async () => {
    fetchMock.postOnce('http://localhost:8080/api/users/', user1);
    fetchMock.putOnce('http://localhost:8080/api/users/1', 200);
    await store.dispatch(addUser(user1));
    await store.dispatch(editUser({username: 'username', email: 'email', index: 0, _id: '1'}));
    assert.equal(store.getState().users[0].username, 'username');
  });
});
