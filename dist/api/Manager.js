import * as wss from "ws";
import { OpCode } from "../interfaces/OpCode";
export class Manager {
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
                case OpCode.Hello:
                    const interval = payload.d.heartbeat_interval;
                    this.startHeartbeat(interval);
                    this.identify();
                    break;
                case OpCode.Dispatch:
                    // we have event (t = event, d = data event)
                    break;
            }
        });
    }
    /** Send identify (OpcCode.Identify) to discord */
    identify() {
        const identify = {
            op: OpCode.Identify,
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
            this.ws?.send(JSON.stringify({ op: OpCode.Heartbeat, d: null }));
        }, interval);
    }
}
//# sourceMappingURL=Manager.js.map