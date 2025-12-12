export interface GatewayPayload {
    op: number;
    d: any;
    s: number | null;
    t: string | null;
}
export declare class Manager {
    private token;
    private ws?;
    private heartbeatInterval?;
    private sequence;
    private gtwUrl;
    constructor(token: string);
    connect(): void;
    private send;
    private onMessage;
    private startHeartbeat;
    private identify;
}
//# sourceMappingURL=Manager.d.ts.map