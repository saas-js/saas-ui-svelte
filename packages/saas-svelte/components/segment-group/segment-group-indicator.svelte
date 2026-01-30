<script lang="ts">
import { SegmentGroup } from "@ark-ui/svelte/segment-group";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import {
	SEGMENT_GROUP_CTX,
	type SegmentGroupContext,
} from "./segment-group-root.svelte";

interface Props {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { class: className, ...restProps }: Props = $props();

const ctx = getContext<SegmentGroupContext>(SEGMENT_GROUP_CTX);
const styles = $derived(ctx.styles);
</script>

<SegmentGroup.Indicator
	class={twMerge(styles.indicator(), className)}
	{...restProps}
/>
