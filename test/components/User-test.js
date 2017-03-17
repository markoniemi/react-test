import {assert} from 'chai';
import {shallow, mount, render} from 'enzyme';
import React from 'react';
import User from '../../src/components/User.js';

describe('User component', () => {
  describe('render', () => {
    it('should render a user', () => {
      var user = {username: 'username', email: 'email', index: 0};
      const wrapper = shallow(<User user={user}/>);

      assert.equal(wrapper.find('tr').length, 1, 'Expected to have element <tr>');
      assert.equal(wrapper.find('td').at(0).text(), 'username', 'Expected to have element <td>');
      assert.equal(wrapper.find('td').at(1).text(), 'email', 'Expected to have element <td>');
    });
  });
});
