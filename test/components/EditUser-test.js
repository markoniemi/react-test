import { assert } from 'chai';
import { shallow, mount, render } from 'enzyme';
import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import EditUser from '../../src/components/EditUser.js';
import store from '../../src/stores/Store';
import { addUser, removeUser, editUser, resetUsers } from '../../src/actions/UserActions';
describe('EditUser component', () => {
  afterEach(() => {
    store.dispatch(resetUsers());
  });
  it('should render a user', () => {
    var user = { username: 'username', email: 'email', index: 0 };
    // mount does full DOM render
    const userWrapper = shallow(<EditUser user={user} />);

    // console.log(userWrapper.find(FormControl).at(0).find('input').at(0).html());
    // console.log(userWrapper.find(FormControl).at(0).prop('defaultValue'));
    // console.log(userWrapper.find('input').at(0).html());
    assert.equal(userWrapper.find(FormControl).at(0).prop('defaultValue'), 'username', 'Expected to have value');
    assert.equal(userWrapper.find(FormControl).at(1).prop('defaultValue'), 'email', 'Expected to have value');
  });
  it('should not create error with empty user', () => {
    var user = {};
    const userWrapper = shallow(<EditUser user={user} />);
    assert.equal(userWrapper.state.user, null);
  });
  it('should edit a user', () => {
    var user = { username: 'username', email: 'email', index: 0 };
    const userWrapper = shallow(<EditUser user={user} />);

    assert.equal(userWrapper.find(FormControl).length, 2);
    // username
    let formControl = userWrapper.find(FormControl).at(0);
    assert.equal(formControl.prop('defaultValue'), 'username');
    formControl.simulate('change', { target: { value: 'newUsername' } });
    assert.equal(userWrapper.state().username, 'newUsername');
    // email
    formControl = userWrapper.find(FormControl).at(1);
    assert.equal(formControl.prop('defaultValue'), 'email');
    formControl.simulate('change', { target: { value: 'newEmail' } });
    assert.equal(userWrapper.state().email, 'newEmail');
    userWrapper.find(Button).at(0).simulate('click');
    assert.equal(store.getState().users.length, 1, 'store should have a new user');
    assert.equal(store.getState().users[0].username, 'newUsername');
    assert.equal(store.getState().users[0].email, 'newEmail');
  });
  //   describe('edit with keyboard', () => {
  //     it('should edit a user with keyboard', () => {
  //       var user = {username: 'username', email: 'email', index: 0};
  //       const userWrapper = shallow(<User user={user}/>);

  //       assert.equal(userWrapper.state('editing'), false, 'should not be in editing state');
  //       // start edit by clicking email
  //       userWrapper.find('td').at(0).simulate('click');
  //       assert.equal(userWrapper.state('editing'), true, 'should enter editing state');
  //       // finish editing with enter
  //       const emailWrapper = userWrapper.find(FormControl).at(1).shallow();
  //       emailWrapper.find('input').at(0).simulate('keyPress', {key: 'Enter'});
  //       assert.equal(userWrapper.state('editing'), false, 'should enter view only state');
  //     });
  //   });
});
