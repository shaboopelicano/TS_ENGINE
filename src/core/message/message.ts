export enum MessagePriority {
    NORMAL,
    HIGHT
}

export default class Message {

    public code: string;
    public context: any;
    public sender: any;
    public priority : MessagePriority;

    public constructor(code:string,sender:any,context?:any,priority:MessagePriority = MessagePriority.NORMAL){
        this.code = code;
        this.sender = sender;
        this.context = context;
        this.priority = priority;
    }

}