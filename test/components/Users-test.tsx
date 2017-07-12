import {assert} from "chai";
import {shallow} from "enzyme";
import * as React from "react";
import sinon from "sinon";
import UserRow from "../../src/components/UserRow";
import Users from "../../src/components/Users";

// const onEditSpy = sinon.spy();
// const onDeleteSpy = sinon.spy();

describe("Users component", () => {
  it("should render a user", () => {
    const users = [{username: "username", email: "email", index: 0, _id: "0"}];
    // const wrapper = shallow(<Users users={users} onEdit={onEditSpy} onDelete={onDeleteSpy}/>);
    const wrapper = shallow(<Users users={users} />);

    assert.equal(wrapper.find(UserRow).length, 1, "Expected to have component <UserRow>");
  });
});
