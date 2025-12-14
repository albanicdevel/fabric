import fetch from "node-fetch";
export class MessageService {
    constructor(token) {
        this.token = token;
        this.apiBase = "https://discord.com/api/v10";
    }
    ;
    async send(channelId, options) {
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, this.normalizedOptions(options));
    }
    async reply(channelId, messageId, options) {
        return await this.post(`${this.apiBase}/channels/${channelId}/messages/${messageId}`, {
            ...this.normalizedOptions(options),
            message_reference: {
                message_id: messageId
            }
        });
    }
    async purgeDelete(channelId, messageIds) {
        if (messageIds.length === 0)
            return;
        if (messageIds.length > 100) {
            throw new Error("I cannot delete more than 100 messages at once.");
        }
        await this.post(`${this.apiBase}/channels/${channelId}/messages/bulk-delete`, {
            messages: messageIds
        });
    }
    async deleteMesssage(ChannelId, messageId) {
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
    async purgeLast(channelId, count) {
        if (count <= 0)
            return;
        const res = await fetch(`${this.apiBase}/channels/${channelId}/messages?limit=${count}`, {
            method: "GET",
            headers: { "Authorization": `Bot ${this.token}` }
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Discord error: ${res.statusText} - ${text}`);
        }
        const messages = await res.json();
        const ids = messages.map((m) => m.id);
        await this.purgeDelete(channelId, ids);
    }
    async purgeFirst(channelId, count) {
        if (count <= 0)
            return;
        const res = await fetch(`${this.apiBase}/channels/${channelId}/messages?limit=${count}`, {
            method: "GET",
            headers: {
                "Authorization": `Bot ${this.token}`,
            }
        });
        const text = res.text();
        if (!res.ok) {
            throw new Error(`Discord error: ${res.statusText} - ${text}`);
        }
        const messages = await res.json();
        const ids = messages.slice(-count).map((m) => m.id);
        await this.purgeDelete(channelId, ids);
    }
    async editMessage(channelId, messageId, content) {
        const res = await fetch(`${this.apiBase}/channels/${channelId}/messages/${messageId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bot ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(content)
        });
        const text = await res.text();
        if (!res.ok) {
            throw new Error(`Discord error: ${res.statusText} - ${text}`);
        }
    }
    async sendRenderable(channelId, renderable, ctx) {
        const payload = renderable.render(ctx);
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, {
            embeds: Array.isArray(payload) ? payload : [payload]
        });
    }
    async post(path, body) {
        const res = await fetch(path, {
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
                Dsicrord Error: ${res.status} - ${text}`);
        }
    }
    normalizedOptions(options) {
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
        };
    }
}
//# sourceMappingURL=MessageService.js.map