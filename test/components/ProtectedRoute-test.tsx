import {assert} from "chai";
import {mount, ReactWrapper, render, shallow, ShallowWrapper} from "enzyme";
import * as React from "react";
import {Route, RouteProps, Router} from "react-router-dom";
import * as logger from "winston";
import Jwt from "../../src/api/Jwt";
import {IProtectedRouteProps, ProtectedRoute} from "../../src/components/ProtectedRoute";
import UsersContainer from "../../src/components/UsersContainer";
import history from "../../src/history";

describe("ProtectedRoute component", () => {
  test("should render a route when authenticated", () => {
    Jwt.setToken("token");
    const routerWrapper: ReactWrapper =
      mount(
        <Router history={history}>
          <ProtectedRoute
            exact={true}
            path="/users"
            component={UsersContainer}
            authenticationMethod={Jwt.isAuthenticated}
            authenticationPath={"/"}
          />
        </Router>,
      );
    logger.info(routerWrapper.debug());
    assert.isNotNull(routerWrapper.find(Route), "Expected to have Route component.");
    const route: ReactWrapper<RouteProps> = routerWrapper.find(Route);
    assert.equal(UsersContainer, route.getElement().props.component);
  });
  test("should render redirect when not authenticated", () => {
    Jwt.clearToken();
    const routerWrapper: ReactWrapper =
      mount(
        <Router history={history}>
          <ProtectedRoute
            exact={true}
            path="/users"
            component={UsersContainer}
            authenticationMethod={Jwt.isAuthenticated}
            authenticationPath={"/"}
          />
        </Router>,
      );
    logger.info(routerWrapper.debug());
    assert.isNotNull(routerWrapper.find(Route), "Expected to have Route component.");
    const route: ReactWrapper<RouteProps> = routerWrapper.find(Route);
    assert.notEqual(UsersContainer, route.getElement().props.component);
  });
});
