import {default as Message, MessageType} from "../src/domain/Message";

export const message1: Message = {id: "0", type: MessageType.SUCCESS, text: "success"};
export const message2: Message = {id: "1", type: MessageType.INFO, text: "info"};
export const message3: Message = {id: "2", type: MessageType.WARN, text: "warn"};
export const message4: Message = {id: "3", type: MessageType.ERROR, text: "error"};
export const messages: Message[] = [message1, message2, message3, message4];
