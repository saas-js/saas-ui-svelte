<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { TIMELINE_CTX, type TimelineContext } from "./timeline-root.svelte";
import { Box } from "$saas/layout/box";

interface Props {
	/**
	 * Content to render inside the description.
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<TimelineContext>(TIMELINE_CTX);
</script>

<Box class={twMerge(ctx?.styles.description(), className)} {...restProps}>
	{@render children?.()}
</Box>
