"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const events = __importStar(require("events"));
const Manager_1 = require("../api/Manager");
const MessageService_1 = require("../api/messages/MessageService");
class Bot extends events.EventEmitter {
    constructor(token, intents) {
        super();
        this.token = token;
        this.intents = intents;
        this.manager = new Manager_1.Manager(token, intents);
        this.message = new MessageService_1.MessageService(token);
        this.manager.on("READY", (data) => this.emit("ready", data));
        this.manager.on("MESSAGE_CREATE", (data) => this.emit("MessageCreate", data));
        this.manager.on("heartbeat_ack", () => this.emit("heartbeat_ack"));
    }
    connect() {
        this.manager.connect();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=Bot.js.map