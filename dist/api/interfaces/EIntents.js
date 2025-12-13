"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intents = void 0;
var Intents;
(function (Intents) {
    Intents[Intents["GUILDS"] = 1] = "GUILDS";
    Intents[Intents["GUILD_MEMBERS"] = 2] = "GUILD_MEMBERS";
    Intents[Intents["GUILD_MODERATIONS"] = 4] = "GUILD_MODERATIONS";
    Intents[Intents["GUILD_EXPRESSION"] = 8] = "GUILD_EXPRESSION";
    Intents[Intents["GUILD_INTEGRATION"] = 16] = "GUILD_INTEGRATION";
    Intents[Intents["GUILD_WEBHOOKS"] = 32] = "GUILD_WEBHOOKS";
    Intents[Intents["GUILD_INVITES"] = 64] = "GUILD_INVITES";
    Intents[Intents["GUILD_PRESENCES"] = 128] = "GUILD_PRESENCES";
    Intents[Intents["GUILD_MESSAGES"] = 512] = "GUILD_MESSAGES";
    Intents[Intents["MESSAGE_CONTENT"] = 32768] = "MESSAGE_CONTENT";
})(Intents || (exports.Intents = Intents = {}));
//# sourceMappingURL=EIntents.js.map