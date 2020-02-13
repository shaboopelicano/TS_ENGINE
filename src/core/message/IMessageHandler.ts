import Message from './message';

export default interface IMessageHandler {
    onMessage(onMessage: Message): void;
}