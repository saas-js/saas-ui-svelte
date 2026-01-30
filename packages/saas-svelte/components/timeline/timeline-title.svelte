<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { TIMELINE_CTX, type TimelineContext } from "./timeline-root.svelte";

interface Props {
	/**
	 * Content to render inside the title.
	 */
	children?: Snippet;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	/**
	 * Whether to prevent text wrapping.
	 */
	whiteSpace?: "nowrap" | "normal";
	[key: string]: any;
}

let { children, class: className, whiteSpace, ...restProps }: Props = $props();

const ctx = getContext<TimelineContext>(TIMELINE_CTX);

const whiteSpaceClass = $derived(
	whiteSpace === "nowrap" ? "[text-wrap-mode:nowrap]" : "",
);
</script>

<div
	class={twMerge(ctx?.styles.title(), whiteSpaceClass, className)}
	{...restProps}
>
	{@render children?.()}
</div>
