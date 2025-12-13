export enum Intents {
    GUILDS = 1 << 0,
    GUILD_MEMBERS = 1 << 1,
    GUILD_MODERATIONS = 1 << 2,
    GUILD_EXPRESSION = 1 << 3,
    GUILD_INTEGRATION = 1 << 4,
    GUILD_WEBHOOKS = 1 << 5,
    GUILD_INVITES = 1 << 6,
    GUILD_PRESENCES = 1 << 7,
    GUILD_MESSAGES = 1 << 9,
    MESSAGE_CONTENT = 1 << 15
}