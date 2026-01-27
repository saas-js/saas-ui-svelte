import Root from "./hover-card-root.svelte";
import Trigger from "./hover-card-trigger.svelte";
import Content from "./hover-card-content.svelte";
import Arrow from "./hover-card-arrow.svelte";

export {
    hoverCard,
    type HoverCardVariants,
    type HoverCardContext,
} from "./hover-card-root.svelte";

export const HoverCardRoot = Root;
export const HoverCardTrigger = Trigger;
export const HoverCardContent = Content;
export const HoverCardArrow = Arrow;

export const HoverCard = {
    Root,
    Trigger,
    Content,
    Arrow,
};
