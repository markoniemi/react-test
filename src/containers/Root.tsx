import "bootstrap/dist/css/bootstrap.css";
import * as React from "react";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import App from "../components/App";
import UserContainer from "../components/UserContainer";
import "../main.css";
import store from "../stores/Store";

export const Root: React.SFC<{}> = () => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/users/new" component={UserContainer}/>
      <Route path="/users/:id" component={UserContainer}/>
    </Router>
  </Provider>
);
