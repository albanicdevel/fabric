## Fabric API

Hi everyone!
Feeling confident, I decided to create **fabric-api** — a lightweight and extensible Discord API wrapper focused on simplicity and control.

---

## Getting Started

### Basic Usage

```ts
import { Bot, IMessage, Intents } from "@fabric-devel/fabric-api";

const bot = new Bot("YOUR_BOT_TOKEN", [
    Intents.GUILD_MESSAGES,
    Intents.MESSAGE_CONTENT
]);

bot.on("ready", (client) => {
    console.log(`${client.user.username} is ready`);
});

bot.on("messageCreate", (msg: IMessage) => {
    if (msg.content === "!go") {
        bot.message.reply(msg.channel.id, msg.id, {
            content: "Okay!"
        });

        bot.message.purgeDelete(msg.channel.id, [
            "1449399444998066269",
            "1449375108647878808"
        ]);
    }
});

bot.connect();
```

### Use EmbedComponent by fabric

```ts
import {
    Bot, 
    IMessage, 
    Intents, 
    IReady, 
    EmbedComponent, 
    IEmbed 
} from '@fabric-devel/fabric-api';    

export class StatusEmbed extends EmbedComponent {
    constructor(
        private name: string,
        private version: string,
        private online: boolean
    ) {
        super();
    }

    render(): IEmbed {
        return {
            title: this.name,
            description: this.online ? "💚 Online" : "❤️ Offline",
            color: this.online ? 0x57F287 : 0xED4245,
            fields: [
                {
                    name: "Version", value: this.version, inline: true,
                }, {
                    name: "Uptime", value: process.uptime().toFixed(0) + "s", inline: true
                }
            ]
        }
    }
}


const bot = new Bot("", [Intents.MESSAGE_CONTENT, Intents.GUILD_MESSAGES]);

bot.on("ready", (client) => {
    console.log(`${client.user.username} is ready`);
});

bot.on("messageCreate", (msg: IMessage) => {
    if(msg.content === "!status") {
        const status = new StatusEmbed("fabric", "0.1.0", true);
        bot.message.sendRenderable(msg.channel.id, status, {
            botId: bot.id,
            channelId: msg.channel.id,
            guildId: msg.guild?.id
        });
    }
});

bot.connect();
```