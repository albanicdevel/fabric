import * as wss from "ws";
import * as events from "events";
import { OpCode } from "./interfaces/gateway";
export class Manager extends events.EventEmitter {
    constructor(token, intents) {
        super();
        this.token = token;
        this.intents = intents;
        this.sequence = null;
        this.gatewayUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
    }
    connect() {
        this.ws = new wss.WebSocket(this.gatewayUrl);
        this.ws.on("open", () => console.log("Connected to Discord Gateway"));
        this.ws.on("message", (data) => this.onMessage(data.toString()));
        this.ws.on("close", (code, reason) => {
            console.log(`Disconnected - ${code}: ${reason.toString()}`);
            if (this.heartbeatInterval)
                clearInterval(this.heartbeatInterval);
            setTimeout(() => this.connect(), 5000);
        });
    }
    send(payload) {
        if (!this.ws || this.ws.readyState !== wss.WebSocket.OPEN)
            return;
        this.ws.send(JSON.stringify(payload));
    }
    onMessage(raw) {
        const payload = JSON.parse(raw);
        if (payload.s !== null)
            this.sequence = payload.s;
        switch (payload.op) {
            case OpCode.Hello:
                this.startHeartbeat(payload.d.heartbeat_interval);
                this.identify();
                break;
            case OpCode.HeartbeatAck:
                this.emit("heartbeatAck");
                break;
            case OpCode.Dispatch:
                if (payload.t === "READY") {
                    this.sessionId = payload.d.session_id;
                    const client = { user: payload.d.user };
                    this.emit("ready", client);
                }
                if (payload.t === "MESSAGE_CREATE") {
                    const d = payload.d;
                    const msg = {
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
                break;
        }
    }
    startHeartbeat(interval) {
        if (this.heartbeatInterval)
            clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => {
            this.send({ op: OpCode.Heartbeat, d: this.sequence });
        }, interval);
    }
    identify() {
        const intentBits = this.intents.reduce((acc, i) => acc | i, 0);
        const payload = {
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
//# sourceMappingURL=Manager.js.map