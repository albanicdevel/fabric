![icon](/icon/icon.png)
hi guys. felt confident and therefore created "fabric-api".

*How to use?*

```ts
import { Bot, IMessage, Intents, IReady } from './package/export';

const bot = new Bot("", [Intents.MESSAGE_CONTENT, Intents.GUILD_MESSAGES]);

bot.on("ready", (client) => {
    console.log(`${client.user.username} is ready`);
});

bot.on("messageCreate", (msg: IMessage) => {
    if(msg.content === "!go") {
        bot.message.reply(msg.channel.id, msg.id, {
            content: "Okay!"
        });
        bot.message.purgeDelete(msg.channel.id, ["1449399444998066269", "1449375108647878808"]);
    }
});

bot.connect();
```