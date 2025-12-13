import * as events from "events";
import { Intents } from "./interfaces/EIntents";
export declare class Manager extends events.EventEmitter {
    private token;
    private intents;
    private ws?;
    private heartbeatInterval?;
    private sequence;
    private readonly gtwUrl;
    private sessionId?;
    constructor(token: string, intents: Intents);
    connect(): void;
    private send;
    private onMessage;
    private startHeartbeat;
    private identify;
    private resume;
}
//# sourceMappingURL=Manager.d.ts.map