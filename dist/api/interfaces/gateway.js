;
;
;
export var OpCode;
(function (OpCode) {
    OpCode[OpCode["Dispatch"] = 0] = "Dispatch";
    OpCode[OpCode["Heartbeat"] = 1] = "Heartbeat";
    OpCode[OpCode["Identify"] = 2] = "Identify";
    OpCode[OpCode["Resume"] = 6] = "Resume";
    OpCode[OpCode["Hello"] = 10] = "Hello";
    OpCode[OpCode["HeartbeatAck"] = 11] = "HeartbeatAck";
})(OpCode || (OpCode = {}));
;
//# sourceMappingURL=gateway.js.map