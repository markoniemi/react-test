import store from '../../src/stores/Store';
import {ADD_USER, REMOVE_USER, EDIT_USER, RESET_USERS} from '../../src/actions/UserActions';
import expect from 'expect';

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
      expect(store.getState().users.length).toEqual(2);
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
      expect(store.getState().users).toEqual([]);
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
      expect(store.getState().users[0].username).toEqual('username');
      expect(store.getState().users[0].email).toEqual('email');
    });
  });
});
