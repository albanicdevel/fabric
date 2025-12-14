import { OpCode } from "./OpCode";
export interface RawPayload {
    op: OpCode;
    d?: any;
    s?: string;
    t?: string;
}
export interface HelloPayload {
    op: OpCode;
    d: {
        heartbeat_interval: number;
    };
}
export interface IdentifyPayload {
    op: OpCode;
    d: {
        token: string;
        intents: number;
        properties: {
            $os: string;
            $browser: string;
            $device: string;
        };
    };
}
//# sourceMappingURL=Payload.d.ts.map