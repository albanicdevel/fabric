/** Op code - The operation code that defines the type of event. */
export enum OpCode {
    Dispatch = 0, // Event from discord
    Heartbeat = 1, // Hartbeat to api
    Identify = 2, // Identify our client
    Hello = 10, // Hello (from server after connected)
    HeartbeatACK = 11 // Accepting heartbeat. 
}