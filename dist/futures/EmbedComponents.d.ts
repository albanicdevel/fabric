import { IEmbed } from "./IEmbed";
import { Renderable, RenderContext } from "./IRenderable";
export declare abstract class EmbedComponent implements Renderable<IEmbed> {
    abstract render(ctx: RenderContext): IEmbed;
}
//# sourceMappingURL=EmbedComponents.d.ts.map