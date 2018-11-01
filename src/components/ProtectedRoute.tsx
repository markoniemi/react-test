import * as React from "react";
import {Redirect, Route, RouteComponentProps, RouteProps} from "react-router-dom";
import Jwt from "../api/Jwt";

export interface IProtectedRouteProps extends RouteProps {
  authenticationPath: string;
}

export class ProtectedRoute extends Route<IProtectedRouteProps> {
  public render() {
    let redirectPath: string = "";
    if (!Jwt.isAuthenticated()) {
      redirectPath = this.props.authenticationPath;
    }
    if (redirectPath) {
      const renderComponent = () => (<Redirect to={{pathname: redirectPath}} path={this.props.path}/>);
      return <Route {...this.props} component={renderComponent} />;
    } else {
      return <Route {...this.props}/>;
    }
  }
}
