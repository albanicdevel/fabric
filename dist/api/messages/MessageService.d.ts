import { Renderable, RenderContext } from "../../futures/IRenderable";
import { IMessageOption } from "../interfaces/IEvents";
import { IMessageService } from "./IMessageService";
export declare class MessageService implements IMessageService {
    private token;
    private readonly apiBase;
    constructor(token: string);
    send(channelId: string, options: IMessageOption): Promise<void>;
    reply(channelId: string, messageId: string, options: IMessageOption): Promise<void>;
    purgeDelete(channelId: string, messageIds: string[]): Promise<void>;
    deleteMesssage(ChannelId: string, messageId: string): Promise<void>;
    purgeLast(channelId: string, count: number): Promise<void>;
    purgeFirst(channelId: string, count: number): Promise<void>;
    editMessage(channelId: string, messageId: string, content: string): Promise<void>;
    sendRenderable(channelId: string, renderable: Renderable<any>, ctx: RenderContext): Promise<void>;
    private post;
    private normalizedOptions;
}
//# sourceMappingURL=MessageService.d.ts.map