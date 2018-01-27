import * as React from "react";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import store from "../stores/Store";
import UserContainer from "./UserContainer";
import UsersContainer from "./UsersContainer";

export default class App extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <AppContainer>
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path="/" component={UsersContainer}/>
            <Route path="/users/new" component={UserContainer}/>
            <Route path="/users/:id" component={UserContainer}/>
          </Router>
        </Provider>
      </AppContainer>
    );
  }

}
