import * as events from "events";
import { Manager } from "../api/Manager";
import { MessageService } from "../api/messages/MessageService";
import { Intents } from "../api/interfaces/EIntents";
import { IReady, IMessage } from "../api/interfaces/IEvents";

export class Bot extends events.EventEmitter {
    public manager: Manager;
    public message: MessageService;
    public token: string;
    public username?: string;
    public id?: string;
    public discriminator?: string;
    public intents: Intents[];

    constructor(token: string, intents: Intents[]) {
        super();
        this.token = token;
        this.intents = intents;

        this.manager = new Manager(token, intents);
        this.message = new MessageService(token);

        this.manager.on("ready", (client: IReady) => {
            this.id = client.user.id;
            this.username = client.user.username;
            this.discriminator = client.user.discriminator;
            this.emit("ready", client);
        });

        this.manager.on("messageCreate", (msg: IMessage) => this.emit("messageCreate", msg));
        this.manager.on("heartbeatAck", () => this.emit("heartbeatAck"));
    }

    public connect(): void {
        this.manager.connect();
    }
}
