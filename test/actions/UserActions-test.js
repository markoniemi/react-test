import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';
import expect from 'expect';

describe('Action', () => {
  afterEach(() => {
    store.dispatch(resetUsers());
  });
  describe('Dispatch ADD_USER', () => {
    it('should add user in store', () => {
      store.dispatch(addUser({username: "user1", email: "email"}));
      store.dispatch(addUser({username: "user2", email: "email"}));
      expect(store.getState().users.length).toEqual(2);
    });
  });
  describe('Dispatch REMOVE_USER', () => {
    it('should remove user from store', () => {
      store.dispatch(addUser({username: "user1", email: "email"}));
      store.dispatch(removeUser(0));
      expect(store.getState().users).toEqual([]);
    });
  });
  describe('Dispatch CHANGE_USERNAME', () => {
    it('should change username in store', () => {
      store.dispatch(addUser({username: "user1", email: "email1"}));
      store.dispatch(editUser(0, {username: "username", email: "email"}));
      expect(store.getState().users[0].username).toEqual('username');
    });
  });
});
