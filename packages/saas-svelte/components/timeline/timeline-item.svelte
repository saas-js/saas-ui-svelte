<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { TIMELINE_CTX, type TimelineContext } from "./timeline-root.svelte";

	interface Props {
		/**
		 * Content to render inside the timeline item.
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

<div
	role="listitem"
	class={twMerge(ctx?.styles.item(), className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>
