import { Intents } from "./EIntents";
export interface GatewayPayload<D = any> {
    op: number;
    d: D;
    s: number | null;
    t: string | null;
}
export interface HelloData {
    heartbeat_interval: number;
}
export interface IdentifyData {
    token: string;
    intents: Intents | number;
    properties: {
        $os: string;
        $browser: string;
        $device: string;
    };
}
export declare enum OpCode {
    Dispatch = 0,
    Heartbeat = 1,
    Identify = 2,
    Resume = 6,
    Hello = 10,
    HeartbeatAck = 11
}
//# sourceMappingURL=gateway.d.ts.map