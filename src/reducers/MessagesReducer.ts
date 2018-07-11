import * as Debug from "debug";
import {IMessageAction, MessageActionType} from "../actions/MessageActions";
import Message from "../domain/Message";

const debug: Debug.IDebugger = Debug("MessagesReducer");

export default (state: ReadonlyArray<Message> = [], action: IMessageAction): ReadonlyArray<Message> => {
  switch (action.type) {
    case MessageActionType.ADD_MESSAGE:
      return addMessage(state, action);
    case MessageActionType.RESET_MESSAGES:
      return resetMessages(state, action);
  }
  return state;
};

function addMessage(state: ReadonlyArray<Message>, action: IMessageAction): ReadonlyArray<Message> {
  debug("addMessage: %s", action.payload.message.type);
  return [...state, action.payload.message];
}

function resetMessages(state: ReadonlyArray<Message>, action: IMessageAction) {
  return [];
}
