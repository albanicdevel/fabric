import { Renderable, RenderContext } from "../../futures/IRenderable";
import { IMessageOption } from "../interfaces/IEvents";

export interface IMessageService {
    send(channelId: string, options: IMessageOption): Promise<void>;
    reply(channelId: string, messageId: string, options: IMessageOption): Promise<void>;
    purgeDelete(channelId: string, messageIds: string[]): Promise<void>;
    deleteMesssage(ChannelId: string, messageId: string): Promise<void>;
    editMessage(channelId: string, messageId: string, content: string): Promise<void>;
    purgeLast(channelId: string, count: number): Promise<void>;
    purgeFirst(channelId: string, count: number): Promise<void>;

    sendRenderable(channelId: string, renderable: Renderable<any>, ctx: RenderContext): Promise<void>;
}