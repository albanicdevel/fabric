import * as events from "events";
import { Manager } from "../api/Manager";

export class Bot extends events.EventEmitter {
    public manager: Manager;
    constructor(public token: string) {
        super();
        this.manager = new Manager(token);

        this.manager.on("READY", (data) => this.emit("READY", data));
        this.manager.on("MESSAGE_CREATE", (data) => this.emit("MESSAGE_CREATE", data));
        this.manager.on("heartbeat_ack", () => this.emit("heartbeat_ack"));
    }

    public connect() {
        this.manager.connect();
    }
}