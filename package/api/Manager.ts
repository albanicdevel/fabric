import * as wss from "ws";
import * as events from "events";
import { Intents } from "./interfaces/EIntents";
<<<<<<< HEAD
import { GatewayPayload, IdentifyData, OpCode, HelloData } from "./interfaces/gateway";
=======
>>>>>>> af45ca1 (Patching lib)
import { IMessage, IReady } from "./interfaces/IEvents";

export class Manager extends events.EventEmitter {
    private ws?: wss.WebSocket;
    private heartbeatInterval?: NodeJS.Timeout;
    private sequence: number | null = null;
<<<<<<< HEAD
    private sessionId?: string;
    private readonly gatewayUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
=======
    private readonly gtwUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
    private sessionId?: string;
>>>>>>> af45ca1 (Patching lib)

    constructor(private token: string, private intents: Intents[]) {
        super();
    }

    public connect(): void {
<<<<<<< HEAD
        this.ws = new wss.WebSocket(this.gatewayUrl);

        this.ws.on("open", () => console.log("Connected to Discord Gateway"));
        this.ws.on("message", (data: wss.RawData) => this.onMessage(data.toString()));
        this.ws.on("close", (code: number, reason: Buffer) => {
            console.log(`Disconnected - ${code}: ${reason.toString()}`);
=======
        this.ws = new wss.WebSocket(this.gtwUrl);

        this.ws.on("open", () => console.log("Connected to Discord Gateway"));
        this.ws.on("message", (data) => this.onMessage(data.toString()));
        this.ws.on("close", (c, r) => {
            console.log(`Disconnected - ${c}: ${r.toString()}`);
>>>>>>> af45ca1 (Patching lib)
            if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
            setTimeout(() => this.connect(), 5000);
        });
    }

    private send(payload: object): void {
        if (!this.ws || this.ws.readyState !== wss.WebSocket.OPEN) return;
        this.ws.send(JSON.stringify(payload));
    }

    private onMessage(raw: string): void {
        const payload: GatewayPayload = JSON.parse(raw);

        if (payload.s !== null) this.sequence = payload.s;

        switch (payload.op) {
            case OpCode.Hello:
<<<<<<< HEAD
                this.startHeartbeat((payload.d as HelloData).heartbeat_interval);
=======
                this.startHeartbeat(payload.d.heartbeat_interval);
>>>>>>> af45ca1 (Patching lib)
                this.identify();
                break;

            case OpCode.HeartbeatAck:
                this.emit("heartbeatAck");
                break;

            case OpCode.Dispatch:
                if (payload.t === "READY") {
<<<<<<< HEAD
                    this.sessionId = (payload.d as any).session_id;
                    const client: IReady = { user: (payload.d as any).user };
=======
                    this.sessionId = payload.d.session_id;
                    const client: IReady = { user: payload.d.user };
>>>>>>> af45ca1 (Patching lib)
                    this.emit("ready", client);
                }

                if (payload.t === "MESSAGE_CREATE") {
<<<<<<< HEAD
                    const d: any = payload.d;
                    const msg: IMessage = {
                        id: d.id,
                        content: d.content,
                        author: d.author,
                        channel: { id: d.channel_id },
                        guild: d.guild_id ? { id: d.guild_id } : undefined,
                        timestamp: d.timestamp,
                        editedTimestamp: d.edited_timestamp,
                        tts: d.tts,
                        mentionEveryone: d.mention_everyone,
                        mentions: d.mentions
                    };
                    this.emit("messageCreate", msg);
                }
=======
                    const msg: IMessage = {
                        id: payload.d.id,
                        content: payload.d.content,
                        author: payload.d.author,
                        channel: { id: payload.d.channel_id },
                        guild: payload.d.guild_id ? { id: payload.d.guild_id } : undefined
                    };
                    this.emit("messageCreate", msg);
                }

>>>>>>> af45ca1 (Patching lib)
                break;
        }
    }

    private startHeartbeat(interval: number): void {
        if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => {
            this.send({ op: OpCode.Heartbeat, d: this.sequence });
        }, interval);
    }

    private identify(): void {
        const intentBits = this.intents.reduce((acc, i) => acc | i, 0);

        const payload: GatewayPayload<IdentifyData> = {
            op: OpCode.Identify,
            d: {
                token: this.token,
                intents: intentBits,
                properties: { $os: "fabric", $browser: "fabric", $device: "fabric" }
            },
            s: null,
            t: null
        };

        this.send(payload);
    }
}
