import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import * as uuid from "uuid";
import Message, {MessageType} from "../domain/Message";
import {IRootState} from "../stores/Store";

export type IMessageActionPayload = Message;

export interface IMessageAction extends Action<IMessageActionPayload> {
  type: MessageActionType;
}

export enum MessageActionType {
  ADD_MESSAGE = "ADD_MESSAGE",
  RESET_MESSAGES = "RESET_MESSAGES",
}

export default class MessageActions {
  public static error(text: string): ThunkAction<Promise<IMessageAction>, IRootState, any> {
    return this.addMessage(text, MessageType.ERROR);
  }

  public static addMessage(text: string, type: MessageType): ThunkAction<Promise<IMessageAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<IMessageAction> => {
      const message: Message = {id: uuid.v1(), type, text};
      return dispatch({
        type: MessageActionType.ADD_MESSAGE,
        payload: message,
      });
    };
  }

  public static resetMessages(): IMessageAction {
    return {
      type: MessageActionType.RESET_MESSAGES,
    };
  }
}
