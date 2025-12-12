hi guys. felt confident and therefore created "fabric-api".

*How to use?*

```ts
import { Bot } from "@fabric-devel/fabric-api";

const bot = new Bot("TOKEN");
bot.on("EVENT", (d) => {...});
bot.connect();
```