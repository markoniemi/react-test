import React from 'react';
// import Users from './Users.js';
import { addUser } from '../actions/UserActions'
import { Button } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from '../stores/Store';

export default class App extends React.Component {
  render() {
      return (
        <Provider store={store}>
          <Panel header="Users" >
            <p>Hello world</p>
            <Button bsStyle="primary" onClick={this.newUser}><Glyphicon glyph="glyphicon glyphicon-plus"/></Button>
          </Panel>
        </Provider>
      );
  }
  newUser() {
    console.log('newUser');
    store.dispatch(addUser({username: 'username', email: 'email'}));
  }
  // editUser(user) {
  //   UserActions.update(user);
  // }
  // deleteUser(id) {
  //   UserActions.delete(id);
  // }
}
