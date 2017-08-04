import "bootstrap/dist/css/bootstrap.css";
import "./main.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Root} from "./containers/Root";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import App from "./components/App";
import UserContainer from "./components/UserContainer";
import "./main.css";
import store from "./stores/Store";

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}/>
          <Route path="/users/new" component={UserContainer}/>
          <Route path="/users/:id" component={UserContainer}/>
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById("root"),
  );
};

render();

if (module.hot) {
  module.hot.accept("./containers/Root", () => {
    render();
  });
}
