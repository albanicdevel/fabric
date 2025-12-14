"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const Manager_1 = require("../api/Manager");
class Bot {
    constructor(token, intents) {
        this.token = token;
        this.intents = intents;
        this.manager = new Manager_1.Manager(this.token);
    }
    connect() {
        this.manager.connect();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map