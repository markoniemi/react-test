import {assert} from 'chai';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';

describe('Action', () => {
  afterEach(() => {
    store.dispatch(resetUsers());
  });
  it('should add user in store', () => {
    store.dispatch(addUser({username: 'user1', email: 'email', _id: '1'}));
    store.dispatch(addUser({username: 'user2', email: 'email', _id: '2'}));
    setTimeout(() => {
      assert.equal(store.getState().users.length, 2);
    }, 100);
  });
  it('should remove user from store', () => {
    store.dispatch(addUser({username: 'user1', email: 'email', _id: '1'}));
    store.dispatch(addUser({username: 'user2', email: 'email', _id: '2'}));
    store.dispatch(removeUser({username: 'user1', email: 'email', _id: '1'}));
    setTimeout(() => {
      assert.equal(store.getState().users.length, 1);
    }, 100);
  });
  it('should change username in store', () => {
    store.dispatch(addUser({username: 'user1', email: 'email1'}));
    store.dispatch(editUser(0, {username: 'username', email: 'email'}));
    setTimeout(() => {
      assert.equal(store.getState().users[0].username, 'username');
    }, 100);
  });
});
