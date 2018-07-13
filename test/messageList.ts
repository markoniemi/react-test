import {default as Message, MessageType} from "../src/domain/Message";

export const message1: Message = {_id: "0", type: MessageType.SUCCESS, text: "success"};
export const message2: Message = {_id: "1", type: MessageType.INFO, text: "info"};
export const message3: Message = {_id: "2", type: MessageType.WARN, text: "warn"};
export const message4: Message = {_id: "3", type: MessageType.ERROR, text: "error"};
export const messages: Message[] = [message1, message2, message3, message4];
