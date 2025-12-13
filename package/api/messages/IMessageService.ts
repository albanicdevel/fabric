export interface IMessageService {
    send(channelId: string, content: string): Promise<void>;
    reply(channelId: string, messageId: string, content: string): Promise<void>;
    purgeDelete(channelId: string, messageIds: string[]): Promise<void>
}