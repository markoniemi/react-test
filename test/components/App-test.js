import {assert} from 'chai';
import {shallow, mount, render} from 'enzyme';
import React from 'react';
import {Button} from 'react-bootstrap';
import UsersContainer from '../../src/components/UsersContainer.js';
import App from '../../src/components/App.js';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';

describe('App component', () => {
  afterEach(() => {
    store.dispatch(resetUsers());
  });
  describe('render', () => {
    it('should render App', () => {
      const appWrapper = shallow(<App/>);
      assert.isNotNull(appWrapper.find(UsersContainer));
    });
  });
  describe('add user', () => {
    it('should add user', () => {
      const appWrapper = shallow(<App/>);
      assert.equal(store.getState().users.length, 0);
      appWrapper.find(Button).at(0).simulate('click');
      assert.equal(store.getState().users.length, 1);
    });
  });
});
