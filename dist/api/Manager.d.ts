export declare class Manager {
    private ws?;
    private readonly gatewayUrl;
    private token;
    private heartbeatInterval?;
    constructor(token: string);
    /**
     * Send hello to discord gateway and get dispatch (notif of event)
     */
    connect(): void;
    /** Send identify (OpcCode.Identify) to discord */
    identify(): void;
    /**
     * Regular sending heartbeat(Opcode.Heartbeat = 1)
     * @param {number} interval for next heartbeat
     */
    startHeartbeat(interval: number): void;
}
//# sourceMappingURL=Manager.d.ts.map