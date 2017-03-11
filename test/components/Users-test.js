import Users from '../../src/components/Users.js';
import User from '../../src/components/User.js';
import {shallow, mount, render} from 'enzyme';
import React from 'react';

var onEditSpy = sinon.spy();
var onDeleteSpy = sinon.spy();

describe('Users component', () => {
  describe('render', () => {
    it('should render a user', () => {
      var users = [{username: 'username', email: 'email', index: 0}];
      const wrapper = shallow(<Users users={users} onEdit={ onEditSpy } onDelete={onDeleteSpy}/>);
      // console.log(wrapper.debug());

      // expect(wrapper.find(User)).to.have.length.of(1, 'Expected to have element with tag <User>');
      expect(wrapper.find(User)).to.have.length.of(1, 'Expected to have element with tag <User>');
      // expect(wrapper.prop('users')).to.have.length.of(1, 'Expected to have one user');
    });
  });
});
