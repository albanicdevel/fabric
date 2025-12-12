import { Manager } from "../api/Manager";
export class Bot {
    constructor(token) {
        this.token = token;
        this.ws = new Manager(token);
    }
    up() {
        this.ws.connect();
    }
}
//# sourceMappingURL=Bot.js.map