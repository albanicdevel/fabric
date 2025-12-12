import * as wss from "ws";
export class Manager {
    constructor(token) {
        this.token = token;
        this.sequence = null;
        this.gtwUrl = "wss://gateway.discord.gg/?v=10&encoding=json";
    }
    connect() {
        this.ws = new wss.WebSocket(this.gtwUrl);
        this.ws.on("open", () => console.log("Connected to Discord Gateway"));
        this.ws.on("message", (data) => this.onMessage(data.toString()));
        this.ws.on("close", () => {
            console.log("Disconnected from Gateway");
            if (this.heartbeatInterval)
                clearInterval(this.heartbeatInterval);
        });
    }
    send(payload) {
        this.ws?.send(JSON.stringify(payload));
    }
    onMessage(raw) {
        const payload = JSON.parse(raw);
        if (payload.s !== null)
            this.sequence = payload.s;
        switch (payload.op) {
            case 10: // HELLO
                this.startHeartbeat(payload.d.heartbeat_interval);
                this.identify();
                break;
            case 11: // HEARTBEAT ACK
                console.log("Heartbeat ACK");
                break;
            default:
                if (payload.t) {
                    return payload.d;
                }
        }
    }
    startHeartbeat(interval) {
        console.log(`Starting heartbeat every ${interval}ms`);
        this.heartbeatInterval = setInterval(() => {
            this.send({ op: 1, d: this.sequence });
        }, interval);
    }
    identify() {
        const payload = {
            op: 2,
            d: {
                token: this.token,
                intents: 513,
                properties: {
                    $os: "linux",
                    $browser: "my_library",
                    $device: "my_library"
                }
            }
        };
        this.send(payload);
    }
}
//# sourceMappingURL=Manager.js.map