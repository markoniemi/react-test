import User from '../../src/components/User.js';
import {shallow, mount, render} from 'enzyme';
import React from 'react';

describe('User component', () => {
  describe('render', () => {
    it('should render a user', () => {
      var user = {username: 'username', email: 'email', index: 0};
      const wrapper = shallow(<User user={user}/>);
      console.log(wrapper.debug());

      expect(wrapper.find('tr')).to.have.length.of(1, 'Expected to have element with tag <User>');
      // expect(wrapper.prop('users')).to.have.length.of(1, 'Expected to have one user');
    });
  });
});
