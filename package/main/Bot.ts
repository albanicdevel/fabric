import * as events from "events";
import { Manager } from "../api/Manager";
import { MessageService } from "../api/messages/MessageService";
import { Intents } from "../api/interfaces/EIntents";
export class Bot extends events.EventEmitter {
    private manager: Manager;
    public message: MessageService;
    constructor(public token: string, public intents: Intents) {
        super();
        this.manager = new Manager(token, intents);
        this.message = new MessageService(token);

        this.manager.on("READY", (data) => this.emit("ready", data));
        this.manager.on("MESSAGE_CREATE", (data) => this.emit("MessageCreate", data));
        this.manager.on("heartbeat_ack", () => this.emit("heartbeat_ack"));
    }

    public connect() {
        this.manager.connect();
    }
}