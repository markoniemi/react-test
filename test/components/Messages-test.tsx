import {assert} from "chai";
import {shallow} from "enzyme";
import * as React from "react";
import {Alert} from "react-bootstrap";
import {IMessages, Messages} from "../../src/components/Messages";
import {IRootState} from "../../src/stores/Store";
import {messages} from "../messageList";

describe("Messages component", () => {
  test("should not create error with empty user list", () => {
    const wrapper = shallow(<Messages messages={[]}/>);
    assert.isNotNull(wrapper.find(Messages), "Expected to have component Messages");
  });
  test("mapStateToProps", () => {
    const state: IRootState = {messages};
    const messageProps: IMessages = Messages.mapStateToProps(state);
    assert.equal(messageProps.messages.length, 4);
    assert(messageProps.messages[0].text, "success");
  });
  test("render", () => {
    const wrapper = shallow(<Messages messages={messages}/>);
    assert.isNotNull(wrapper.find(Messages), "Expected to have component Messages");
    assert.isNotNull(wrapper.find(Alert), "Expected to have component Alert");
  });
});
