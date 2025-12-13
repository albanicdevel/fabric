import * as events from "events";
import { MessageService } from "../api/messages/MessageService";
import { Intents } from "../api/interfaces/EIntents";
export declare class Bot extends events.EventEmitter {
    token: string;
    intents: Intents;
    private manager;
    message: MessageService;
    constructor(token: string, intents: Intents);
    connect(): void;
}
//# sourceMappingURL=Bot.d.ts.map