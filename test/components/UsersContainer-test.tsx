import {assert} from "chai";
import {shallow} from "enzyme";
import "isomorphic-fetch";
import * as React from "react";
import {Button} from "react-bootstrap";
import {SinonSpy} from "sinon";
import * as sinon from "sinon";
import UserRow from "../../src/components/UserRow";
import {IUsersContainer, UsersContainer} from "../../src/components/UsersContainer";
import {IRootState} from "../../src/stores/Store";
import {user1, users} from "../userList";

describe("UsersContainer component", () => {
  test("should not create error with empty user list", () => {
    const wrapper = shallow(<UsersContainer users={[]}/>);
    assert.isNotNull(wrapper.find(UsersContainer), "Expected to have component UsersContainer");
  });
  test("New user button should call newUser", () => {
    // @ts-ignore: Argument of type
    const spy: SinonSpy = sinon.spy(UsersContainer.prototype, "newUser");
    const wrapper = shallow(<UsersContainer users={[]}/>);
    assert.isNotNull(wrapper.find(UsersContainer), "Expected to have component UsersContainer");
    const element = wrapper.find(Button).at(1).simulate("click");
    assert.isTrue(spy.calledOnce);
  });
  test("mapStateToProps", () => {
    const state: IRootState = {users};
    const usersContainer: IUsersContainer = UsersContainer.mapStateToProps(state);
    assert(usersContainer.users[0].username, "user1");
  });
  test("render", () => {
    const wrapper = shallow(<UsersContainer users={users}/>);
    assert.isNotNull(wrapper.find(UsersContainer), "Expected to have component UsersContainer");
    assert.isNotNull(wrapper.find(UserRow), "Expected to have component UserRow");
  });
});
