import * as Debug from "debug";
import * as React from "react";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {browserHistory, Route, Router, hashHistory, RouterState, RedirectFunction} from "react-router";
import Jwt from "../api/Jwt";
import i18nConfig from "../messages/messages";
import store from "../stores/Store";
import LoginForm from "./LoginForm";
import UserContainer from "./UserContainer";
import UsersContainer from "./UsersContainer";
import {IntlProvider} from "react-intl";

export default class App extends React.Component<any, any> {
  private static debug: Debug.IDebugger = Debug("App");

  public render(): JSX.Element {
    // TODO replace isAuthenticated check with protected routes
    return (
      <AppContainer>
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
          <Provider store={store}>
            <Router history={hashHistory}>
              <Route path="/users" component={UsersContainer} onEnter={this.isAuthenticated}/>
              <Route path="/users/new" component={UserContainer} onEnter={this.isAuthenticated}/>
              <Route path="/users/:id" component={UserContainer} onEnter={this.isAuthenticated}/>
              <Route path="*" component={LoginForm}/>
            </Router>
          </Provider>
        </IntlProvider>
      </AppContainer>
    );
  }

  private isAuthenticated(nextState: RouterState, replace: RedirectFunction): void {
    if (!Jwt.isAuthenticated()) {
      App.debug("not authenticated, return to login");
      replace("/");
    }
  }
}
