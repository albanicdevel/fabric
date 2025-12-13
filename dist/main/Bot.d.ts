import * as events from "events";
import { Manager } from "../api/Manager";
import { MessageService } from "../api/messages/MessageService";
import { Intents } from "../api/interfaces/EIntents";
export declare class Bot extends events.EventEmitter {
    manager: Manager;
    message: MessageService;
    token: string;
    username?: string;
    id?: string;
    discriminator?: string;
    intents: Intents[];
    constructor(token: string, intents: Intents[]);
    connect(): void;
}
//# sourceMappingURL=Bot.d.ts.map