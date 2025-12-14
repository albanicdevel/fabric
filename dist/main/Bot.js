import * as events from "events";
import { Manager } from "../api/Manager";
import { MessageService } from "../api/messages/MessageService";
export class Bot extends events.EventEmitter {
    constructor(token, intents) {
        super();
        this.token = token;
        this.intents = intents;
        this.manager = new Manager(token, intents);
        this.message = new MessageService(token);
        this.manager.on("ready", (client) => {
            this.id = client.user.id;
            this.username = client.user.username;
            this.discriminator = client.user.discriminator;
            this.emit("ready", client);
        });
        this.manager.on("messageCreate", (msg) => this.emit("messageCreate", msg));
        this.manager.on("heartbeatAck", () => this.emit("heartbeatAck"));
    }
    connect() {
        this.manager.connect();
    }
}
//# sourceMappingURL=Bot.js.map