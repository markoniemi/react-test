import {assert} from 'chai';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import {shallow, } from 'enzyme';
import React from 'react';
import {Button} from 'react-bootstrap';
import UsersContainer from '../../src/components/UsersContainer.js';
import App from '../../src/components/App.js';
import store from '../../src/stores/Store';
import {resetUsers} from '../../src/actions/UserActions';

describe('App component', () => {
  beforeEach(() => {
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(resetUsers());
  });
  it('should render App', () => {
    const appWrapper = shallow(<App/>);
    assert.isNotNull(appWrapper.find(UsersContainer));
  });
  xit('should add user', async (done) => {
    const appWrapper = shallow(<App/>);
    const user1 = {username: 'user1', email: 'email', index: 0, _id: '1'};
    fetchMock.postOnce('http://localhost:8080/api/users/', user1);
    await appWrapper.find(Button).at(0).simulate('click');
    setTimeout((store) => {
      assert.equal(store.getState().users.length, 1);
      done();
    }, 1000, store);
  });
});
