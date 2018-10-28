import {ConnectedRouter} from "connected-react-router";
import * as Debug from "debug";
import * as React from "react";
import {AppContainer} from "react-hot-loader";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {Route, Switch} from "react-router-dom";
import Jwt from "../api/Jwt";
import history from "../history";
import i18nConfig from "../messages/messages";
import store from "../stores/Store";
import LoginForm from "./LoginForm";
import UserContainer from "./UserContainer";
import UsersContainer from "./UsersContainer";

export default class App extends React.Component<{}, {}> {
  private static readonly debug: Debug.IDebugger = Debug("App");

  constructor(props: {}) {
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
              <ConnectedRouter history={history}>
                <Switch>
                  <Route exact={true} path="/users" component={UsersContainer} onEnter={this.isAuthenticated}/>
                  <Route exact={true} path="/users/new" component={UserContainer} onEnter={this.isAuthenticated}/>
                  <Route exact={true} path="/users/:id" component={UserContainer} onEnter={this.isAuthenticated}/>
                  <Route path="*" component={LoginForm}/>
                </Switch>
              </ConnectedRouter>
            </div>
          </Provider>
        </IntlProvider>
      </AppContainer>
    );
  }

  private isAuthenticated(nextState: any, replace: any): void {
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
