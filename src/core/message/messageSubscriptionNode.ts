import Message from "./message";
import IMessageHandler from "./IMessageHandler";

export default class MessageSubscriptionNode {

    public message: Message;
    public handler: IMessageHandler;

    public constructor(message: Message, handler: IMessageHandler) {
        this.message = message;
        this.handler = handler;
    }


}