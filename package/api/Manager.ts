import * as wss from "ws";
import { GatewayPayload, IdentifyData, OpCode } from "./interfaces/gateway";
import * as events from "events";
import { Intents } from "./interfaces/EIntents";

export class Manager extends events.EventEmitter {
    private ws?: wss.WebSocket;
    private heartbeatInterval?: NodeJS.Timeout;
    private sequence: number | null = null;
    private readonly gtwUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
    private sessionId?: number;
    constructor(private token: string, private intents: Intents) {
        super();
    }

    public connect() {
        this.ws = new wss.WebSocket(this.gtwUrl);

        this.ws.on("open", () => console.log("Connected to Discord Gateway"));
        this.ws.on("message", (data) => this.onMessage(data.toString()));
        this.ws.on("close", (c, r) => {
            console.log(`Disconnected from websocket - ${c}: reason: ${r.toString()}`);
            if(this.heartbeatInterval) clearInterval(this.heartbeatInterval);
            setTimeout(() => this.connect(), 5000);
        });
    }

    private send(payload: object) {
        if(!this.ws || this.ws.readyState !== wss.WebSocket.OPEN) return
        try {
            this.ws.send(JSON.stringify(payload));
        } catch(e) {
            console.error(e);
        }
    }

    private onMessage(raw: string) {
        const payload: GatewayPayload = JSON.parse(raw);

        if (payload.s !== null) this.sequence = payload.s;

        switch (payload.op) {
            case OpCode.Hello:
                this.startHeartbeat(payload.d.heartbeat_interval);
                if(this.sessionId) this.resume();
                this.identify();
                break;
            case OpCode.HeartbeatAck:
                console.log("Heartbeat ACK");
                break;
            case OpCode.Dispatch:
                if(payload.t === "READY") this.sessionId = payload.d.session_id;
                if(payload.t) this.emit(payload.t, payload.d);
                break; 
        }
    }

    private startHeartbeat(interval: number) {
        if(this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => {
            this.send({ op: OpCode.Heartbeat, d: this.sequence });
        }, interval);
    }

    private identify() {
        const payload: GatewayPayload<IdentifyData> = {
            op: OpCode.Identify,
            d: {
                token: this.token,
                intents: this.intents,
                properties: {
                    $os: "fabric",
                    $browser: "fabric",
                    $device: "fabric"
                }
            },
            s: null,
            t: null
        };
        this.send(payload);
    }

    private resume() {
        if(!this.sessionId) {
            this.send({
                op: OpCode.Resume,
                d: {
                    token: this.token,
                    session_id: this.sessionId,
                    seq: this.sequence
                },
            });
        }
    }
}