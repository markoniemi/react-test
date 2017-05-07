import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './main.css';
import 'bootstrap/dist/css/bootstrap.css';
import store from './stores/Store';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/App';
import UserContainer from './components/UserContainer';

function main() {
  const app = document.createElement('div');
  document.body.appendChild(app);
  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/users/:index" component={UserContainer}/>
      </Router>
    </Provider>
  ), app);
}
// ), document.createElement('div'));
//   <Route path="/users/new" component={NewUserPage} />
main();

