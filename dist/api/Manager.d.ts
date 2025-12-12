import * as events from "events";
export declare class Manager extends events.EventEmitter {
    private token;
    private ws?;
    private heartbeatInterval?;
    private sequence;
    private readonly gtwUrl;
    private sessionId?;
    constructor(token: string);
    connect(): void;
    private send;
    private onMessage;
    private startHeartbeat;
    private identify;
    private resume;
}
//# sourceMappingURL=Manager.d.ts.map