import {assert} from "chai";
import {shallow} from "enzyme";
import * as React from "react";
import UserRow from "../../src/components/UserRow";
import Users from "../../src/components/Users";
import {users} from "../userList";
import sinon = require("sinon");

describe("Users component", () => {
  test("should render a user", () => {
    const wrapper = shallow(<Users users={users} deleteUser={sinon.stub()} saveUser={sinon.stub()} editUser={sinon.stub()}/>);

    assert.equal(wrapper.find(UserRow).length, 2, "Expected to have component UserRow");
  });
});
