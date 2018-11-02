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
import {ProtectedRoute} from "./ProtectedRoute";
import UserContainer from "./UserContainer";
import UsersContainer from "./UsersContainer";

export default class App extends React.Component<{}, {}> {
  private static readonly debug: Debug.IDebugger = Debug("App");

  constructor(props: {}) {
    super(props);
    this.initLog();
  }

  public render(): JSX.Element {
    return (
      <AppContainer>
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
          <Provider store={store}>
            <div>
              <ConnectedRouter history={history}>
                <Switch>
                  <ProtectedRoute exact={true} path="/users" component={UsersContainer} authenticationMethod={Jwt.isAuthenticated} authenticationPath={"/"}/>
                  <ProtectedRoute exact={true} path="/users/new" component={UserContainer} authenticationMethod={Jwt.isAuthenticated} authenticationPath={"/"}/>
                  <ProtectedRoute exact={true} path="/users/:id" component={UserContainer} authenticationMethod={Jwt.isAuthenticated} authenticationPath={"/"}/>
                  <Route path="*" component={LoginForm}/>
                </Switch>
              </ConnectedRouter>
            </div>
          </Provider>
        </IntlProvider>
      </AppContainer>
    );
  }

  private initLog() {
    if (process.env.LOG_LEVEL === "debug") {
      Debug.enable("*");
    } else {
      Debug.disable();
    }
  }
}
