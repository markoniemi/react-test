import {assert} from 'chai';
import store from '../../src/stores/Store';
import {ADD_USER, REMOVE_USER, EDIT_USER, RESET_USERS} from '../../src/actions/UserActions';

describe('Store', () => {
  afterEach(() => {
    store.dispatch({type: RESET_USERS});
  });
  describe('Dispatch ADD_USER', () => {
    it('should add user in store', () => {
      store.dispatch({
        type: ADD_USER,
        user: {username: "user1", email: "email"}
      });
      store.dispatch({
        type: ADD_USER,
        user: {username: "user2", email: "email"}
      });
      assert.equal(store.getState().users.length, 2);
    });
  });
  describe('Dispatch REMOVE_USER', () => {
    it('should remove user from store', () => {
      store.dispatch({
        type: ADD_USER,
        user: {username: "user1", email: "email"}
      });
      store.dispatch({
        type: REMOVE_USER,
        index: 0
      });
      assert.equal(store.getState().users.length, 0);
    });
  });
  describe('Dispatch EDIT_USER', () => {
    it('should change user in store', () => {
      store.dispatch({
        type: ADD_USER,
        user: {username: "user1", email: "email1"}
      });
      store.dispatch({
        type: EDIT_USER,
        index: 0,
        user: {
          username: "username",
          email: "email"
        }
      });
      assert.equal(store.getState().users[0].username, 'username');
      assert.equal(store.getState().users[0].email, 'email');
    });
  });
});
