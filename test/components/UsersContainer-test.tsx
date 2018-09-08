import {assert} from "chai";
import {shallow, ShallowWrapper} from "enzyme";
import "isomorphic-fetch";
import * as React from "react";
import {Button} from "react-bootstrap";
import {RouterState} from "react-router";
import * as sinon from "sinon";
import {SinonSpy} from "sinon";
import UserRow from "../../src/components/UserRow";
import {IUsersContainer, IUsersContainerActions, UsersContainer} from "../../src/components/UsersContainer";
import {IRootState} from "../../src/stores/Store";
import {user1, users} from "../userList";

describe("UsersContainer component", () => {
  test("should not create error with empty user list", () => {
    const wrapper: ShallowWrapper<IUsersContainer & IUsersContainerActions, RouterState> = shallow(
      <UsersContainer
        users={[]}
      />);
    assert.isNotNull(wrapper.find(UsersContainer), "Expected to have component UsersContainer");
  });
  test("New user button should call addUser", () => {
    // @ts-ignore: Argument of type
    const spy: SinonSpy = sinon.spy(UsersContainer, "newUser");
    const wrapper: ShallowWrapper<IUsersContainer & IUsersContainerActions, RouterState> = shallow(
      <UsersContainer
        users={[]}
        newUser={spy}
      />);
    assert.isNotNull(wrapper.find(UsersContainer), "Expected to have component UsersContainer");
    wrapper.find(Button).at(0).simulate("click");
    assert.isTrue(spy.calledOnce);
  });
  test("mapStateToProps", () => {
    const state: IRootState = {users};
    const usersContainer: IUsersContainer = UsersContainer.mapStateToProps(state);
    assert(usersContainer.users[0].username, "user1");
  });
  test("render", () => {
    const wrapper: ShallowWrapper<IUsersContainer & IUsersContainerActions, RouterState> = shallow(
      <UsersContainer
        users={users}
      />);
    assert.isNotNull(wrapper.find(UsersContainer), "Expected to have component UsersContainer");
    assert.isNotNull(wrapper.find(UserRow), "Expected to have component UserRow");
  });
});
