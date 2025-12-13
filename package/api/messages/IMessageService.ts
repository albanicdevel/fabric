export interface IMessageService {
    send(channelId: string, content: string): Promise<void>;
    reply(channelId: string, messageId: string, content: string): Promise<void>;
    purgeDelete(channelId: string, messageIds: string[]): Promise<void>;
    deleteMesssage(ChannelId: string, messageId: string): Promise<void>;
    editMessage(channelId: string, messageId: string, content: string): Promise<void>;
    purgeLast(channelId: string, count: number): Promise<void>;
    purgeFirst(channelId: string, count: number): Promise<void>;
}