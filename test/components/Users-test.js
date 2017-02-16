import Users from '../../src/components/Users.js';
import User from '../../src/components/User.js';
import TestUtils from 'react-addons-test-utils';
import React from 'react';

var component;
var onEditSpy = sinon.spy();
var onDeleteSpy = sinon.spy();

describe('Given an instance of the Component', () => {
  describe('when we render the component', () => {
    before(() => {
      var users = [{username: 'username', email: 'email', index: 0}];
      component = TestUtils.renderIntoDocument(<Users users={users} onEdit={ onEditSpy } onDelete={onDeleteSpy}/>);
    });
    it('should render a paragraph', () => {
      var users = TestUtils.scryRenderedComponentsWithType(component, User);

      expect(users).to.have.length.above(0, 'Expected to have element with tag <User>');
      expect(users[0].state.username).to.equal('username');
      expect(users[0].state.email).to.equal('email');
    });
  });
});
