import {assert} from "chai";
import {shallow, ShallowWrapper} from "enzyme";
import "isomorphic-fetch";
import * as React from "react";
import App from "../../src/components/App";
import {IUserRow, IUserRowState} from "../../src/components/UserRow";
import UsersContainer from "../../src/components/UsersContainer";

describe("App component", () => {
  test("should render App", () => {
    const appWrapper: ShallowWrapper<any, any> = shallow(<App/>);
    assert.isNotNull(appWrapper.find(UsersContainer));
  });
});
