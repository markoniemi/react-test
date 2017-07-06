import {assert} from 'chai';
import fetchMock from 'fetch-mock';
import {shallow} from 'enzyme';
import React from 'react';
import {FormControl, Button} from 'react-bootstrap';
import EditUser from '../../src/components/EditUser.js';
import store from '../../src/stores/Store';
import {addUser, resetUsers} from '../../src/actions/UserActions';
const user1 = {username: 'user1', email: 'email', index: 0, _id: '1'};
describe('EditUser component', () => {
  beforeEach(() => {
    fetchMock.spy();
  });
  afterEach(() => {
    fetchMock.restore();
    store.dispatch(resetUsers());
  });
  it('should render a user', () => {
    const userWrapper = shallow(<EditUser user={user1}/>);

    assert.equal(userWrapper.find(FormControl).at(0).prop('defaultValue'), '1', 'Expected to have value');
    assert.equal(userWrapper.find(FormControl).at(1).prop('defaultValue'), 'user1', 'Expected to have value');
    assert.equal(userWrapper.find(FormControl).at(2).prop('defaultValue'), 'email', 'Expected to have value');
  });
  it('should not create error with empty user', () => {
    var emptyUser = {};
    const userWrapper = shallow(<EditUser user={emptyUser}/>);
    assert.equal(userWrapper.state.user, null);
  });
  it('should edit a user', async (done) => {
    fetchMock.postOnce('http://localhost:8080/api/users/', user1);
    fetchMock.putOnce('http://localhost:8080/api/users/1', 200);
    await store.dispatch(addUser(user1));
    const editUserWrapper = shallow(<EditUser user={user1}/>);

    // username
    let formControl = editUserWrapper.find(FormControl).at(1);
    assert.equal(formControl.prop('defaultValue'), 'user1');
    formControl.simulate('change', {target: {value: 'newUsername'}});
    assert.equal(editUserWrapper.state().username, 'newUsername');
    // email
    formControl = editUserWrapper.find(FormControl).at(2);
    assert.equal(formControl.prop('defaultValue'), 'email');
    formControl.simulate('change', {target: {value: 'newEmail'}});
    assert.equal(editUserWrapper.state().email, 'newEmail');
    await editUserWrapper.find(Button).at(0).simulate('click');
    setTimeout((store) => {
      assert.equal(store.getState().users.length, 1, 'store should have a new user');
      assert.equal(store.getState().users[0].username, 'newUsername');
      assert.equal(store.getState().users[0].email, 'newEmail');
      done();
    }, 100, store);
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
