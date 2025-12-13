"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class MessageService {
    constructor(token) {
        this.token = token;
        this.apiBase = "https://discord.com/api/v10";
    }
    ;
    async send(channelId, content) {
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, {
            content
        });
    }
    async reply(channelId, messageId, content) {
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, {
            content,
            message_reference: {
                message_id: messageId
            }
        });
    }
    async post(path, body) {
        const res = await (0, node_fetch_1.default)(path, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`
                Dsicrord Error: ${res.status} ${res.statusText}`);
        }
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=MessageService.js.map