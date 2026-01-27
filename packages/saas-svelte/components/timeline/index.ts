import TimelineRoot from "./timeline-root.svelte";
import TimelineItem from "./timeline-item.svelte";
import TimelineConnector from "./timeline-connector.svelte";
import TimelineContent from "./timeline-content.svelte";
import TimelineTitle from "./timeline-title.svelte";
import TimelineDescription from "./timeline-description.svelte";

export const Timeline = {
    Root: TimelineRoot,
    Item: TimelineItem,
    Connector: TimelineConnector,
    Content: TimelineContent,
    Title: TimelineTitle,
    Description: TimelineDescription,
};

export { TimelineRoot, TimelineItem, TimelineConnector, TimelineContent, TimelineTitle, TimelineDescription };

export type { TimelineVariants, TimelineContext } from "./timeline-root.svelte";
