import SegmentGroupRoot from "./segment-group-root.svelte";
import SegmentGroupItem from "./segment-group-item.svelte";
import SegmentGroupIndicator from "./segment-group-indicator.svelte";

export { segmentGroup, type SegmentGroupVariants } from "./segment-group-root.svelte";

export const SegmentGroup = {
    Root: SegmentGroupRoot,
    Item: SegmentGroupItem,
    Indicator: SegmentGroupIndicator,
};

export { SegmentGroupRoot, SegmentGroupItem, SegmentGroupIndicator };
