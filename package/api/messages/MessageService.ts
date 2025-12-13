import { IMessageService } from "./IMessageService";
import fetch from "node-fetch";
export class MessageService implements IMessageService {
    private readonly apiBase = "https://discord.com/api/v10";
    constructor(private token: string) {};

    public async send(channelId: string, content: string): Promise<void> {
        await this.post(`${this.apiBase}/channels/${channelId}/messages`, {
            content
        });
    }

    public async reply(
        channelId: string,
        messageId: string,
        content: string): Promise<void> {
            await this.post(`${this.apiBase}/channels/${channelId}/messages`, {
                content,
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
    
    private async post(path: string, body: object): Promise<void> {
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
                Dsicrord Error: ${res.status} ${res.statusText}`);
        }
    }
}