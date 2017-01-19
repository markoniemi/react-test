import store from '../../src/stores/Store';
import { CHANGE_USERNAME, CHANGE_EMAIL, ADD_USER, REMOVE_USER, RESET_USERS } from '../../src/actions/UserActions';
import expect from 'expect';

describe('Store', () => {
    afterEach(() => {
        store.dispatch({type: RESET_USERS});
    });
    describe('Dispatch CHANGE_USERNAME', () => {
        it('should change username in store', () => {
            store.dispatch({
                type: CHANGE_USERNAME,
                username: "name1"
            });
            expect(store.getState().user.username).toEqual('name1');
        });
    });
    describe('Dispatch CHANGE_EMAIL', () => {
        it('should change age in store', () => {
            store.dispatch({
                type: CHANGE_EMAIL,
                email: "email"
            });
            expect(store.getState().user.email).toEqual('email');
        });
    });
    describe('Dispatch ADD_USER', () => {
        it('should add user in store', () => {
            store.dispatch({
                type: ADD_USER,
                user: {username:"user1",email:"email"}
            });
            store.dispatch({
                type: ADD_USER,
                user: {username:"user2",email:"email"}
            });
            expect(store.getState().users.length).toEqual(2);
        });
    });
    describe('Dispatch REMOVE_USER', () => {
        it('should remove user from store', () => {
            store.dispatch({
                type: ADD_USER,
                user: {username:"user1",email:"email"}
            });
            store.dispatch({
                type: REMOVE_USER,
                index: 0
            });
            expect(store.getState().users).toEqual([]);
        });
    });
});
