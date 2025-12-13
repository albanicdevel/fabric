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
const gateway_1 = require("./interfaces/gateway");
const events = __importStar(require("events"));
class Manager extends events.EventEmitter {
    constructor(token, intents) {
        super();
        this.token = token;
        this.intents = intents;
        this.sequence = null;
        this.gtwUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
    }
    connect() {
        this.ws = new wss.WebSocket(this.gtwUrl);
        this.ws.on("open", () => console.log("Connected to Discord Gateway"));
        this.ws.on("message", (data) => this.onMessage(data.toString()));
        this.ws.on("close", (c, r) => {
            console.log(`Disconnected from websocket - ${c}: reason: ${r.toString()}`);
            if (this.heartbeatInterval)
                clearInterval(this.heartbeatInterval);
            setTimeout(() => this.connect(), 5000);
        });
    }
    send(payload) {
        if (!this.ws || this.ws.readyState !== wss.WebSocket.OPEN)
            return;
        try {
            this.ws.send(JSON.stringify(payload));
        }
        catch (e) {
            console.error(e);
        }
    }
    onMessage(raw) {
        const payload = JSON.parse(raw);
        if (payload.s !== null)
            this.sequence = payload.s;
        switch (payload.op) {
            case gateway_1.OpCode.Hello:
                this.startHeartbeat(payload.d.heartbeat_interval);
                if (this.sessionId)
                    this.resume();
                this.identify();
                break;
            case gateway_1.OpCode.HeartbeatAck:
                console.log("Heartbeat ACK");
                break;
            case gateway_1.OpCode.Dispatch:
                if (payload.t === "READY")
                    this.sessionId = payload.d.session_id;
                if (payload.t)
                    this.emit(payload.t, payload.d);
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
        const payload = {
            op: gateway_1.OpCode.Identify,
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
    resume() {
        if (!this.sessionId) {
            this.send({
                op: gateway_1.OpCode.Resume,
                d: {
                    token: this.token,
                    session_id: this.sessionId,
                    seq: this.sequence
                },
            });
        }
    }
}
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map