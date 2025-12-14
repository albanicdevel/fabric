import { Manager } from "../api/Manager";

export class Bot {
    private token: string;
    private intents: number;
    private manager: Manager;
    constructor(token: string, intents: number) {
        this.token = token;
        this.intents = intents;
        this.manager = new Manager(this.token);
    }

    public connect() {
        this.manager.connect();
    }
}