hi guys. felt confident and therefore created "fabric-api".

*How to use?*

```ts
import { Bot, Intents } from "@fabric-devel/fabric-api";

const bot = new Bot("TOKEN_HERE", Intents.MESSAGE_CONTENT | Intents.GUILD_MESSAGES);

bot.on("ready", () => {
    console.log("Bot is ready!");
});

bot.on("MessageCreate", (m) => {
    if(m.content === "!ping") {
        bot.message.reply(m.channel_id, m.id, "Pong!");
    }
});

bot.connect();
```