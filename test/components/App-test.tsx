import {assert} from "chai";
import {shallow} from "enzyme";
import "isomorphic-fetch";
import * as React from "react";
import App from "../../src/components/App";
import UsersContainer from "../../src/components/UsersContainer";

describe("App component", () => {
  test("should render App", () => {
    const appWrapper = shallow(<App/>);
    assert.isNotNull(appWrapper.find(UsersContainer));
  });
});
