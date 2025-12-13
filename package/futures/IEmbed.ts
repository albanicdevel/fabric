export interface IEmbed {
    title?: string;
    description?: string;
    url?: string;
    color?: number;

    footer?: {
        text: string;
        icon_url?: string;
    };

    image?: {
        url: string;
    };

    thumbnail?: {
        url: string;
    };

    author?: {
        name: string;
        url?: string;
        icon_url?: string;
    };

    fields?: IEmbedField[];

    timestamp?: string;
}

export interface IEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
