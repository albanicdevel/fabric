export interface IUser {
    id: string;
    username: string;
    discriminator: string;
    bot?: boolean;
}
export interface IChannel {
    id: string;
    name?: string;
}
export interface IGuild {
    id: string;
    name?: string;
}
export interface IMessage {
    id: string;
    content: string;
    author: IUser;
    channel: IChannel;
    guild?: IGuild;
    timestamp?: string;
    editedTimestamp?: string | null;
    tts?: boolean;
    mentionEveryone?: boolean;
    mentions?: IUser[];
}
export interface IReady {
    user: IUser;
}
export interface IDiscordEvents {
    ready: IReady;
    messageCreate: IMessage;
    heartbeatAck: void;
}
export interface IMessageOption {
    content?: string;
    tts?: boolean;
    embeds?: any[];
    allowedMentions?: {
        parse?: ("users" | "roles" | "everyone")[];
        users?: string[];
        roles?: string[];
        repliedUsers?: boolean;
    };
    components?: any[];
    flags?: number;
}
//# sourceMappingURL=IEvents.d.ts.map