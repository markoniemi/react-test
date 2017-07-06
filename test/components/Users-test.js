import {assert} from 'chai';
import {shallow} from 'enzyme';
import React from 'react';
import Users from '../../src/components/Users.js';
import User from '../../src/components/User.js';
import sinon from 'sinon';

var onEditSpy = sinon.spy();
var onDeleteSpy = sinon.spy();

describe('Users component', () => {
  it('should render a user', () => {
    var users = [{username: 'username', email: 'email', index: 0, _id: '0' }];
    const wrapper = shallow(<Users users={users} onEdit={ onEditSpy } onDelete={onDeleteSpy}/>);

    assert.equal(wrapper.find(User).length, 1, 'Expected to have component <User>');
  });
});
