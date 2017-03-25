import {assert} from 'chai';
import {shallow, mount, render} from 'enzyme';
import React from 'react';
import {FormControl, Button} from 'react-bootstrap';
import User from '../../src/components/User.js';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';
// TODO render without user should not create error
// TODO test delete
describe('User component', () => {
  afterEach(() => {
    store.dispatch(resetUsers());
  });
  describe('render', () => {
    it('should render a user', () => {
      var user = {username: 'username', email: 'email', index: 0};
      const userWrapper = shallow(<User user={user}/>);

      assert.equal(userWrapper.find('tr').length, 1, 'Expected to have element <tr>');
      assert.equal(userWrapper.find('td').at(0).text(), 'username', 'Expected to have element <td>');
      assert.equal(userWrapper.find('td').at(1).text(), 'email', 'Expected to have element <td>');
    });
  });
  describe('render without user', () => {
    it('should not create error', () => {
      var user = {};
      const userWrapper = shallow(<User user={user}/>);
      assert.equal(userWrapper.state.user, null);
    });
  });
  describe('edit', () => {
    it('should edit a user', () => {
      var user = {username: 'username', email: 'email', index: 0};
      const userWrapper = shallow(<User user={user}/>);

      assert.equal(userWrapper.state('editing'), false);
      userWrapper.find('td').at(0).simulate('click');
      assert.equal(userWrapper.state('editing'), true);
      assert.equal(userWrapper.find(FormControl).length, 2);
      // username
      const usernameWrapper = userWrapper.find(FormControl).at(0).shallow();
      assert.equal(usernameWrapper.prop('defaultValue'), 'username');
      usernameWrapper.simulate('change', {target: {value: 'newUsername'}});
      assert.equal(userWrapper.state().username, 'newUsername');
      // email
      const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
      assert.equal(emailWrapper.prop('defaultValue'), 'email');
      emailWrapper.simulate('change', {target: {value: 'newEmail'}});
      assert.equal(userWrapper.state().email, 'newEmail');
      // finish editing with button
      userWrapper.find(Button).at(0).simulate('click');
      assert.equal(userWrapper.state('editing'), false);
      assert.equal(store.getState().users.length, 1, 'store should have a new user');
      assert.equal(store.getState().users[0].username, 'newUsername');
      assert.equal(store.getState().users[0].email, 'newEmail');
    });
  });
  describe('edit with keyboard', () => {
    it('should edit a user', () => {
      var user = {username: 'username', email: 'email', index: 0};
      const userWrapper = shallow(<User user={user}/>);

      assert.equal(userWrapper.state('editing'), false, 'should not be in editing state');
      // start edit by clicking email
      userWrapper.find('td').at(0).simulate('click');
      assert.equal(userWrapper.state('editing'), true, 'should enter editing state');
      // finish editing with enter
      const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
      emailWrapper.find('input').at(0).simulate('keyPress', {key: 'Enter'});
      assert.equal(userWrapper.state('editing'), false, 'should enter view only state');
    });
  });
  describe('delete', () => {
    it('should delete a user', () => {
      var user = {username: 'username', email: 'email', index: 0};
      store.dispatch(addUser(user));
      const userWrapper = shallow(<User user={user}/>);

      userWrapper.find('Button').at(0).simulate('click');
      assert.equal(userWrapper.state.user, null);
      assert.equal(store.getState().users.length, 0);
    });
  });
});
