import * as Debug from "debug";
import * as React from "react";
import {AppContainer} from "react-hot-loader";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {hashHistory, RedirectFunction, Route, Router, RouterState} from "react-router";
import Jwt from "../api/Jwt";
import i18nConfig from "../messages/messages";
import store from "../stores/Store";
import LoginForm from "./LoginForm";
import NotificationsContainer from "./NotificationsContainer";
import UserContainer from "./UserContainer";
import UsersContainer from "./UsersContainer";

export default class App extends React.Component<any, any> {
  private static readonly debug: Debug.IDebugger = Debug("App");

  constructor(props: any) {
    super(props);
    this.initLog();
  }

  public render(): JSX.Element {
    // TODO replace isAuthenticated check with protected routes
    return (
      <AppContainer>
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
          <Provider store={store}>
            <div>
              <NotificationsContainer/>
              <Router history={hashHistory}>
                <Route path="/users" component={UsersContainer} onEnter={this.isAuthenticated}/>
                <Route path="/users/new" component={UserContainer} onEnter={this.isAuthenticated}/>
                <Route path="/users/:id" component={UserContainer} onEnter={this.isAuthenticated}/>
                <Route path="*" component={LoginForm}/>
              </Router>
            </div>
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

  private initLog() {
    if (process.env.LOG_LEVEL === "debug") {
      Debug.enable("*");
    } else {
      Debug.disable();
    }
  }
}
