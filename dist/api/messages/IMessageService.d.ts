export interface IMessageService {
    send(channelId: string, content: string): Promise<void>;
    reply(channelId: string, messageId: string, content: string): Promise<void>;
}
//# sourceMappingURL=IMessageService.d.ts.map