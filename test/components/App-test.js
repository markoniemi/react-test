import {assert} from 'chai';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import {shallow, mount, render} from 'enzyme';
import React from 'react';
import {Button} from 'react-bootstrap';
import UsersContainer from '../../src/components/UsersContainer.js';
import App from '../../src/components/App.js';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';

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
  it('should add user', () => {
    const appWrapper = shallow(<App/>);
    fetchMock.once('http://localhost:8080/api/users/', 200);
    assert.equal(store.getState().users.length, 0);
    appWrapper.find(Button).at(0).simulate('click');
    setTimeout(() => {
      assert.equal(store.getState().users.length, 1);
    }, 1000);
  });
});
