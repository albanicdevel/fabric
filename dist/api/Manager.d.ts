import * as events from "events";
import { Intents } from "./interfaces/EIntents";
export declare class Manager extends events.EventEmitter {
    private token;
    private intents;
    private ws?;
    private heartbeatInterval?;
    private sequence;
    private sessionId?;
    private readonly gatewayUrl;
    constructor(token: string, intents: Intents[]);
    connect(): void;
    private send;
    private onMessage;
    private startHeartbeat;
    private identify;
}
//# sourceMappingURL=Manager.d.ts.map