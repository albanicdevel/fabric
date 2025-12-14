import * as wss from "ws";
import { HelloPayload, IdentifyPayload, RawPayload } from "../interfaces/Payload";
import { OpCode } from "../interfaces/OpCode";
export class Manager  {
    private ws?: wss.WebSocket;
    private readonly gatewayUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
    private token: string;
    private heartbeatInterval?: NodeJS.Timeout;
    constructor(token: string) {
        this.token = token;
        this.ws = new wss.WebSocket(this.gatewayUrl);
        this.ws.on("open", () => {
            console.log("Connected to discord gateway.");
        });
    }

    /**
     * Send hello to discord gateway and get dispatch (notif of event)
     */
    public connect() {
        this.ws?.on("message", (data: wss.RawData) => {
            const payload = JSON.parse(data.toString()) as RawPayload;
            switch(payload.op) {
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
    public identify() {
        const identify: IdentifyPayload = {
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
        }

        this.ws?.send(JSON.stringify(identify));
    }

    /**
     * Regular sending heartbeat(Opcode.Heartbeat = 1)
     * @param {number} interval for next heartbeat
     */
    public startHeartbeat(interval: number) {
        this.heartbeatInterval = setInterval(() => {
            this.ws?.send(JSON.stringify({ op: OpCode.Heartbeat, d: null }));
        }, interval);
    }
}