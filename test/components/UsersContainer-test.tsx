import {assert} from "chai";
import {shallow} from "enzyme";
import "isomorphic-fetch";
import * as React from "react";
import EditUser from "../../src/components/EditUser";
import {IUserContainer, UserContainer} from "../../src/components/UserContainer";
import UserRow from "../../src/components/UserRow";
import {IUsersContainer, UsersContainer} from "../../src/components/UsersContainer";
import {IRootState} from "../../src/stores/Store";
import {user1, users} from "../userList";

describe("UsersContainer component", () => {
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
