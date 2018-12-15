import * as React from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";

export interface IProtectedRouteProps extends RouteProps {
  authenticationPath: string;
  authenticationMethod: () => boolean;
}

export class ProtectedRoute extends Route<IProtectedRouteProps> {
  public render() {
    let redirectPath: string = "";
    if (!this.props.authenticationMethod()) {
      redirectPath = this.props.authenticationPath;
    }
    if (redirectPath) {
      const renderComponent = () => (<Redirect to={{pathname: redirectPath}} path={this.props.path}/>);
      return <Route {...this.props} component={renderComponent}/>;
    } else {
      return <Route {...this.props}/>;
    }
  }
}
