import { Manager } from "../api/Manager";
export class Bot {
    constructor(token, intents) {
        this.token = token;
        this.intents = intents;
        this.manager = new Manager(this.token);
    }
    connect() {
        this.manager.connect();
    }
}
//# sourceMappingURL=Bot.js.map