import store from '../../src/stores/Store';
import { changeUsername, changeEmail, addUser, removeUser, resetUsers } from '../../src/actions/UserActions';
import expect from 'expect';

describe('Action', () => {
    afterEach(() => {
        store.dispatch(resetUsers());
    });
    describe('Dispatch CHANGE_USERNAME', () => {
        it('should change username in store', () => {
            store.dispatch(changeUsername("name1"));
            expect(store.getState().user.username).toEqual('name1');
        });
    });
    describe('Dispatch CHANGE_EMAIL', () => {
        it('should change age in store', () => {
            store.dispatch(changeEmail("email"));
            expect(store.getState().user.email).toEqual('email');
        });
    });
    describe('Dispatch ADD_USER', () => {
        it('should add user in store', () => {
            store.dispatch(addUser({username:"user1",email:"email"}));
            store.dispatch(addUser({username:"user2",email:"email"}));
            expect(store.getState().users.length).toEqual(2);
        });
    });
    describe('Dispatch REMOVE_USER', () => {
        it('should remove user from store', () => {
            store.dispatch(addUser({username:"user1",email:"email"}));
            store.dispatch(removeUser(0));
            expect(store.getState().users).toEqual([]);
        });
    });
});
