import { IMessageService } from "./IMessageService";
export declare class MessageService implements IMessageService {
    private token;
    private readonly apiBase;
    constructor(token: string);
    send(channelId: string, content: string): Promise<void>;
    reply(channelId: string, messageId: string, content: string): Promise<void>;
    private post;
}
//# sourceMappingURL=MessageService.d.ts.map