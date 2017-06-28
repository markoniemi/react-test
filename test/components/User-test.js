import {assert} from 'chai';
import 'isomorphic-fetch';
import fetchMock from 'fetch-mock';
import {shallow, mount, render} from 'enzyme';
import React from 'react';
import {FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import User from '../../src/components/User.js';
import store from '../../src/stores/Store';
import {addUser, removeUser, editUser, resetUsers} from '../../src/actions/UserActions';
const user1 = {username: 'user1', email: 'email', index: 0, _id: '1'};
describe('User component', () => {
  beforeEach(() => {
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(resetUsers());
  });
  it('should render a user', () => {
    const userWrapper = shallow(<User user={user1}/>);

    assert.equal(userWrapper.find('tr').length, 1, 'Expected to have element <tr>');
    assert.equal(userWrapper.find('td').at(0).text(), 'user1', 'Expected to have element <td>');
    assert.equal(userWrapper.find('td').at(1).text(), 'email', 'Expected to have element <td>');
  });
  it('should not create error with empty user', () => {
    var user = {};
    const userWrapper = shallow(<User user={user}/>);
    assert.equal(userWrapper.state.user, null);
  });
  it('should edit a user', () => {
    fetchMock.once('http://localhost:8080/api/users/', 200);
    const userWrapper = shallow(<User user={user1}/>);

    assert.equal(userWrapper.state('editing'), false);
    userWrapper.find('td').at(0).simulate('click');
    assert.equal(userWrapper.state('editing'), true);
    assert.equal(userWrapper.find(FormControl).length, 2);
    // username
    const usernameWrapper = userWrapper.find(FormControl).at(0).shallow();
    assert.equal(usernameWrapper.prop('defaultValue'), 'user1');
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
    setTimeout(() => {
      assert.equal(store.getState().users.length, 1, 'store should have a new user');
      assert.equal(store.getState().users[0].username, 'newUsername');
      assert.equal(store.getState().users[0].email, 'newEmail');
      // assert.isEmpty(fetchMock.calls().unmatched);
    }, 100);
  });
  it('should edit a user with keyboard', () => {
    const userWrapper = shallow(<User user={user1}/>);

    assert.equal(userWrapper.state('editing'), false, 'should not be in editing state');
    // start edit by clicking email
    userWrapper.find('td').at(0).simulate('click');
    assert.equal(userWrapper.state('editing'), true, 'should enter editing state');
    // finish editing with enter
    const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
    emailWrapper.find('input').at(0).simulate('keyPress', {key: 'Enter'});
    assert.equal(userWrapper.state('editing'), false, 'should enter view only state');
    // TODO test editing user
  });
  it('should delete a user', () => {
    fetchMock.once('http://localhost:8080/api/users/0', 200);
    store.dispatch(addUser(user1));
    const userWrapper = shallow(<User user={user1}/>);

    userWrapper.find('Button').at(1).simulate('click');
    setTimeout(() => {
      assert.equal(userWrapper.state.user, null);
      assert.equal(store.getState().users.length, 0);
      // assert.isEmpty(fetchMock.calls().unmatched);
    }, 100);
  });
});
