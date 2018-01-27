import {assert} from "chai";
import {shallow} from "enzyme";
import * as React from "react";
import EditUser from "../../src/components/EditUser";
import {IUserContainer, UserContainer} from "../../src/components/UserContainer";
import {IRootState} from "../../src/stores/Store";
import {user1, users} from "../userList";

describe("User container", () => {
  test("mapStateToProps", () => {
    const state: IRootState = {users};
    // RouteState is rather complex, let's cheat by declaring it as any
    const routeState: any = {params: {id: "1"}};
    const userContainer: IUserContainer = UserContainer.mapStateToProps(state, routeState);
    assert(userContainer.user.username, "user1");
  });
  test("render", () => {
    const wrapper = shallow(<UserContainer user={user1}/>);
    assert.isNotNull(wrapper.find(UserContainer), "Expected to have component UserContainer");
    assert.isNotNull(wrapper.find(EditUser), "Expected to have component EditUser");
  });
});
