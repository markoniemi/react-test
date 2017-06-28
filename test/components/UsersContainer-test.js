// import {assert} from 'chai';
// import configureMockStore from 'redux-mock-store';
// // import fetchMock from 'fetch-mock';
// import * as userActions from '../../src/actions/UserActions';
// import UserApi from '../../src/api/UserApi';
// import thunk from 'redux-thunk';
// // https://github.com/reactjs/redux/blob/master/docs/recipes/WritingTests.md
// // http://arnaudbenard.com/redux-mock-store/
// import sinonStubPromise from 'sinon-stub-promise';
// import sinon from 'sinon';
// sinonStubPromise(sinon)
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
// let fetchStub;
// // TODO move to UserActions-test
// describe('UsersContainer component', () => {
//   // it('should render a user', () => {
//   //   const users = {users: [{username: 'user', email: 'email'}]};
//   //   // fetchMock.mock('http://localhost:5000/api/users', {status: 200, body: users});
//   //   // const store = mockStore({});
//   //   const store = mockStore({users: []});
//   //   const expectedActions = [
//   //     {type: userActions.FETCH_USERS}
//   //     // {type: userActions.FETCH_USERS_SUCCESS, users: users}
//   //   ];
//   //   store.dispatch(userActions.fetchUsers());
//   //   setTimeout(() => {
//   //     console.log(store.getActions());
//   //     console.log(store.getState());
//   //   }, 1000);
//   //   // console.log(store.getActions());
//   //   // console.log(store.getState());
//   //   // assert.equal(store.getState().users[0].username, 'user');
//   //   // assert.equal(store.getActions()[0].type, userActions.FETCH_USERS);
//   //   // assert.equal(store.getActions()[1].type, userActions.FETCH_USERS_SUCCESS);
//   //   // return store.dispatch(userActions.fetchUsers()).then(() => {
//   //   //   console.log(store.getActions());
//   //   //   console.log(store.getState());
//   //   //   // assert.equal(store.getActions(), expectedActions);
//   //   // });
//   //   // return store.dispatch(userActions.fetchUsers()).then(() => {
//   //   //   console.log(store.getActions());
//   //   //   console.log(store.getState());
//   //   //   // assert.equal(store.getActions(), expectedActions);
//   //   // });
//   // });
//   // beforeEach(() => {
//   //   fetchStub = sinon.stub(window, 'fetch');
//   // });
//   // afterEach(() => {
//   //   sinon.restore(window.fetch);
//   // });
//
//   it('should work', () => {
//     const store = mockStore({users: []});
//     const users = {users: [{username: 'user', email: 'email'}]};
//     var server = sinon.fakeServer.create();
//     'http://localhost:5000/api/users', {status: 200, body: users}
//     server.respondWith('GET', '/api/users',
//       [ 200, {'Content-Type': 'application/json'}, '{users: [{username: \'user\', email: \'email\'}]}']);
//     // fetchStub.returnsPromise().resolves(users);
//     // window.fetch.returns(Promise.resolve(mockApiResponse(users)));
//
//     store.dispatch(userActions.fetchUsers());
//     console.log(store.getActions());
//     console.log(store.getState());
//
//     // do something
//   });
// });
// function mockApiResponse(body = {}) {
//   return new window.Response(JSON.stringify(body), {
//     status: 200,
//     headers: { 'Content-type': 'application/json' }
//   });
// }
