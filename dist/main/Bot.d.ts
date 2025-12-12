import * as events from "events";
import { Manager } from "../api/Manager";
export declare class Bot extends events.EventEmitter {
    token: string;
    manager: Manager;
    constructor(token: string);
    connect(): void;
}
//# sourceMappingURL=Bot.d.ts.map