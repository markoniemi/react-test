import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import '../main.css';
import 'bootstrap/dist/css/bootstrap.css';
import store from '../stores/Store';
import {Router, Route, browserHistory} from 'react-router';
import App from '../components/App';
import UserContainer from '../components/UserContainer';

const Root = () => (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/users/new" component={UserContainer}/>
        <Route path="/users/:id" component={UserContainer}/>
      </Router>
    </Provider>
)

export default Root
