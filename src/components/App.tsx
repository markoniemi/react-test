import * as React from "react";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {browserHistory, Route, Router} from "react-router";
import i18nConfig from "../messages/messages";
import store from "../stores/Store";
import UserContainer from "./UserContainer";
import UsersContainer from "./UsersContainer";
import {IntlProvider} from "react-intl";

export default class App extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <AppContainer>
        <IntlProvider locale={i18nConfig.locale} messages={i18nConfig.messages}>
          <Provider store={store}>
            <Router history={browserHistory}>
              <Route path="/" component={UsersContainer}/>
              <Route path="/users/new" component={UserContainer}/>
              <Route path="/users/:id" component={UserContainer}/>
            </Router>
          </Provider>
        </IntlProvider>
      </AppContainer>
    );
  }

}
