<<<<<<< HEAD
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
=======
export interface IMessage {
    id: string,
    content: string,
    author: {
        id: string,
        username: string,
        discriminator: string,
        bot?: boolean
    },
    channel: {
        id: string,
        name?: string
    },
    guild?: {
        id: string,
        name?: string
    }
}

export interface IReady {
    user: {
        id: string,
        username: string,
        discriminator: string,
        bot: boolean
    }
}
>>>>>>> af45ca1 (Patching lib)
