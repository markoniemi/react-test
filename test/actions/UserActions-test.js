import {assert} from 'chai';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';
const user1 = {username: 'user1', email: 'email', index: 0, _id: '1'};
const user2 = {username: 'user2', email: 'email', index: 1, _id: '2'};
describe('Action', () => {
  beforeEach(() => {
    fetchMock.catch(503);
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(resetUsers());
  });
  it('should add user in store', () => {
    fetchMock.once('/api/users/', {user: user1});
    fetchMock.once('/api/users/', {user: user2});
    store.dispatch(addUser(user1));
    store.dispatch(addUser(user2));
    setTimeout(() => {
      assert.equal(store.getState().users.length, 2);
      assert.true(fetchMock.called());
      assert.isEmpty(fetchMock.calls().unmatched);
    }, 100);
  });
  it('should remove user from store', () => {
    fetchMock.once('/api/users/', {user: user1});
    fetchMock.once('/api/users/', {user: user2});
    store.dispatch(addUser(user1));
    store.dispatch(addUser(user2));
    store.dispatch(removeUser(user1));
    setTimeout(() => {
      assert.equal(store.getState().users.length, 1);
      assert.isEmpty(fetchMock.calls().unmatched);
    }, 100);
  });
  it('should change username in store', () => {
    fetchMock.once('/api/users/', {user: user1});
    fetchMock.once('/api/users/', 200);
    store.dispatch(addUser(user1));
    store.dispatch(editUser({username: 'username', email: 'email', index: 0, _id: '1'}));
    setTimeout(() => {
      assert.equal(store.getState().users[0].username, 'username');
      assert.isEmpty(fetchMock.calls().unmatched);
    }, 100);
  });
});
