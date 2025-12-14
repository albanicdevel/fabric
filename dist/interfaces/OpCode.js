"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpCode = void 0;
/** Op code - The operation code that defines the type of event. */
var OpCode;
(function (OpCode) {
    OpCode[OpCode["Dispatch"] = 0] = "Dispatch";
    OpCode[OpCode["Heartbeat"] = 1] = "Heartbeat";
    OpCode[OpCode["Identify"] = 2] = "Identify";
    OpCode[OpCode["Hello"] = 10] = "Hello";
    OpCode[OpCode["HeartbeatACK"] = 11] = "HeartbeatACK"; // Accepting heartbeat. 
})(OpCode || (exports.OpCode = OpCode = {}));
//# sourceMappingURL=OpCode.js.map