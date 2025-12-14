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
const OpCode_1 = require("../interfaces/OpCode");
class Manager {
    constructor(token) {
        this.gatewayUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
        this.token = token;
        this.ws = new wss.WebSocket(this.gatewayUrl);
        this.ws.on("open", () => {
            console.log("Connected to discord gateway.");
        });
    }
    /**
     * Send hello to discord gateway and get dispatch (notif of event)
     */
    connect() {
        this.ws?.on("message", (data) => {
            const payload = JSON.parse(data.toString());
            switch (payload.op) {
                case OpCode_1.OpCode.Hello:
                    const interval = payload.d.heartbeat_interval;
                    this.startHeartbeat(interval);
                    this.identify();
                    break;
                case OpCode_1.OpCode.Dispatch:
                    // we have event (t = event, d = data event)
                    break;
            }
        });
    }
    /** Send identify (OpcCode.Identify) to discord */
    identify() {
        const identify = {
            op: OpCode_1.OpCode.Identify,
            d: {
                token: `Bot ${this.token}`,
                intents: 513,
                properties: {
                    $os: "fabric",
                    $browser: "fabric",
                    $device: "fabric"
                }
            }
        };
        this.ws?.send(JSON.stringify(identify));
    }
    /**
     * Regular sending heartbeat(Opcode.Heartbeat = 1)
     * @param {number} interval for next heartbeat
     */
    startHeartbeat(interval) {
        this.heartbeatInterval = setInterval(() => {
            this.ws?.send(JSON.stringify({ op: OpCode_1.OpCode.Heartbeat, d: null }));
        }, interval);
    }
}
exports.Manager = Manager;
//# sourceMappingURL=Manager.js.map