"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const wss = __importStar(require("ws"));
const events = __importStar(require("events"));
const gateway_1 = require("./interfaces/gateway");
class Manager extends events.EventEmitter {
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
            case gateway_1.OpCode.Hello:
                this.startHeartbeat(payload.d.heartbeat_interval);
                this.identify();
                break;
            case gateway_1.OpCode.HeartbeatAck:
                this.emit("heartbeatAck");
                break;
            case gateway_1.OpCode.Dispatch:
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
            this.send({ op: gateway_1.OpCode.Heartbeat, d: this.sequence });
        }, interval);
    }
    identify() {
        const intentBits = this.intents.reduce((acc, i) => acc | i, 0);
        const payload = {
            op: gateway_1.OpCode.Identify,
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
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map