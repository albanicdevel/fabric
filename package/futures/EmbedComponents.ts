import { IEmbed } from "./IEmbed";
import { Renderable, RenderContext } from "./IRenderable";

export abstract class EmbedComponent implements Renderable<IEmbed> {
    abstract render(ctx: RenderContext): IEmbed;
}