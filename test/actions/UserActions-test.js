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
    console.log(fetchMock.calls());
    fetchMock.restore();
    store.dispatch(resetUsers());
  });
  it('should add user in store', () => {
    fetchMock.postOnce('http://localhost:8080/api/users/', {user: user1});
    fetchMock.postOnce('http://localhost:8080/api/users/', {user: user2});
    store.dispatch(addUser(user1)).then(() => {
      console.log('addUser');
      assert.equal(store.getState().users.length, 2);
    });
    store.dispatch(addUser(user2));
    setTimeout(() => {
      console.log('timeout callback');
      assert.equal(store.getState().users.length, 2);
      // assert.true(fetchMock.called());
      // assert.isEmpty(fetchMock.calls().unmatched);
    }, 1000);
  });
  it('should remove user from store', () => {
    fetchMock.postOnce('http://localhost:8080/api/users/', {user: user1});
    fetchMock.postOnce('http://localhost:8080/api/users/', {user: user2});
    fetchMock.deleteOnce('http://localhost:8080/api/users/1', 200);
    store.dispatch(addUser(user1));
    store.dispatch(addUser(user2));
    store.dispatch(removeUser(user1));
    setTimeout(() => {
      assert.equal(store.getState().users.length, 1);
      // assert.isEmpty(fetchMock.calls().unmatched);
    }, 1000);
  });
  it('should change username in store', () => {
    fetchMock.postOnce('http://localhost:8080/api/users/', {user: user1});
    fetchMock.putOnce('http://localhost:8080/api/users/1', 200);
    store.dispatch(addUser(user1));
    store.dispatch(editUser({username: 'username', email: 'email', index: 0, _id: '1'}));
    setTimeout(() => {
      assert.equal(store.getState().users[0].username, 'username');
      // assert.isEmpty(fetchMock.calls().unmatched);
    }, 1000);
  });
});
