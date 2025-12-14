import { OpCode } from "./OpCode";

/** Base gateway payload */
export interface BasePayload<T extends OpCode, D> {
    op: T,
    d: D,
    s?: number,
    t?: string,
};

/** Hello Gateway */
export type HelloPayload = BasePayload<
    OpCode.Hello,
    { heartbeat_interval: number }
>;

/** Identify payload */
export type IdentifyPayload = BasePayload<
    OpCode.Identify,
    {
        token: string;
        intents: number;
        properties: {
            $os: string;
            $device: string;
            $browser: string;   
        };
    }
>;

export type HeartbeatPayload = BasePayload<
    OpCode.Heartbeat,
    number | null
>;

/** Dispatch (generics) */
export type DispatchPayload<TEvent extends string = string, TData = unknown> = BasePayload<OpCode.Dispatch, TData> & {
    t: TEvent,
    s: number;
}

/** Union of inbound payloads */
export type GatewayReceivePayload = HelloPayload | DispatchPayload | BasePayload<OpCode.HeartbeatACK, null>;