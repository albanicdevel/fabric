export interface RenderContext {
    botId?: string;
    guildId?: string;
    channelId: string;
}
export interface Renderable<T> {
    render(ctx: RenderContext): T;
}
//# sourceMappingURL=IRenderable.d.ts.map