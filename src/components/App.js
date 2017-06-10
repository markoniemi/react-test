import React from 'react';
import UsersContainer from './UsersContainer';
import {Glyphicon, Panel, Button} from 'react-bootstrap';
import {Provider} from 'react-redux';
import store from '../stores/Store';
import {browserHistory} from 'react-router';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Panel header="Users">
          <UsersContainer/>
          <Button bsStyle="primary" onClick={this.newUser}><Glyphicon glyph="glyphicon glyphicon-plus"/></Button>
        </Panel>
      </Provider>
    );
  }

  newUser() {
    browserHistory.push('/users/new');
  }
}
