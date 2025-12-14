import { Renderable, RenderContext } from "../../futures/IRenderable";
import { bulkMessage } from "../interfaces/gateway";
import { IMessageOption } from "../interfaces/IEvents";
import { IMessageService } from "./IMessageService";
import fetch from "node-fetch";
export class MessageService implements IMessageService {
    private readonly apiBase = "https://discord.com/api/v10";
    constructor(private token: string) {};

    public async send(channelId: string, options: IMessageOption): Promise<void> {
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, this.normalizedOptions(options));
    }

    public async reply(
        channelId: string,
        messageId: string,
        options: IMessageOption): Promise<void> {
            return await this.post(`${this.apiBase}/channels/${channelId}/messages/${messageId}`, {
                ...this.normalizedOptions(options),
                message_reference: {
                    message_id: messageId
                }
            });
        }
    
    public async purgeDelete(channelId: string, messageIds: string[]): Promise<void>{
        if(messageIds.length === 0) return;
        if(messageIds.length > 100) {
            throw new Error("I cannot delete more than 100 messages at once.");
        }

        await this.post(`${this.apiBase}/channels/${channelId}/messages/bulk-delete`, {
            messages: messageIds
        });
    }

    public async deleteMesssage(ChannelId: string, messageId: string): Promise<void> {
        const res = await fetch(`${this.apiBase}/channels/${ChannelId}/messages/${messageId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("Discord API Error:", res.status, res.statusText, text);
            throw new Error(`Discord Error: ${res.status} ${res.statusText}`);
        }
    }

    public async purgeLast(channelId: string, count: number): Promise<void> {
        if(count <= 0) return;
        const res = await fetch(`${this.apiBase}/channels/${channelId}/messages?limit=${count}`, {
            method: "GET",
            headers: { "Authorization": `Bot ${this.token}` }
        });

        if(!res.ok) {
            const text = await res.text();
            throw new Error(`Discord error: ${res.statusText} - ${text}`);
        }

        const messages = await res.json() as bulkMessage[];
        const ids = messages.map((m: bulkMessage) => m.id);
        await this.purgeDelete(channelId, ids);
    }

    public async purgeFirst(channelId: string, count: number): Promise<void> {
        if(count <=0 ) return;
        const res = await fetch(`${this.apiBase}/channels/${channelId}/messages?limit=${count}`, {
            method: "GET",
            headers: {
                "Authorization": `Bot ${this.token}`,
            }
        });
        const text = res.text();
        if(!res.ok) {
            throw new Error(`Discord error: ${res.statusText} - ${text}`);
        }

        const messages = await res.json() as bulkMessage[];
        const ids = messages.slice(-count).map((m: bulkMessage) => m.id);

        await this.purgeDelete(channelId, ids);

    }

    public async editMessage(channelId: string, messageId: string, content: string): Promise<void> {
        const res = await fetch(`${this.apiBase}/channels/${channelId}/messages/${messageId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        });
        const text = await res.text()
        if(!res.ok) {
            throw new Error(`Discord error: ${res.statusText} - ${text}`);
        }
    }

    public async sendRenderable(channelId: string, renderable: Renderable<any>, ctx: RenderContext): Promise<void> {
        const payload = renderable.render(ctx);
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, {
            embeds: Array.isArray(payload) ? payload : [payload]
        });
    }
    
    private async post(path: string, body: object): Promise<any> {
        const res = await fetch(path, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if(!res.ok) {
            const text = await res.text();
            throw new Error(`
                Dsicrord Error: ${res.status} - ${text}`);
        }
    }

    private normalizedOptions(options: IMessageOption) {
        return {
            content: options.content,
            tts: options.tts,
            embeds: options.embeds,
            components: options.components,
            flags: options.flags,
            allowed_parse: options.allowedMentions ? {
                parse: options.allowedMentions.parse,
                users: options.allowedMentions.users,
                roles: options.allowedMentions.roles,
                repliedUsers: options.allowedMentions.repliedUsers
            } : undefined
        }
    }
}