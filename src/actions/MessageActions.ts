import {Dispatch} from "react-redux";
import {Action} from "redux-actions";
import {ThunkAction} from "redux-thunk";
import Message, {MessageType} from "../domain/Message";
import {IRootState} from "../stores/Store";

// TODO replace this with export type IMessageActionPayload = Message | string;
export interface IMessageActionPayload {
  message: Message;
}

export interface IMessageAction extends Action<IMessageActionPayload> {
  type: MessageActionType;
}

export enum MessageActionType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  RESET = "RESET",
}

export default class MessageActions {
  private static id = 0;

  public static error(text: string): ThunkAction<Promise<IMessageAction>, IRootState, any> {
    return async (dispatch: Dispatch<IRootState>): Promise<IMessageAction> => {
      this.id++;
      const message: Message = {_id: this.id.toString(), type: MessageType.ERROR, text: text};
      return dispatch({
        type: MessageActionType.ERROR,
        payload: {message: message},
      });
    };
  }

  public static resetMessages(): IMessageAction {
    return {
      type: MessageActionType.RESET,
    };
  }
}
