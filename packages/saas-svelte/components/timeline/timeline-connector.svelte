<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { TIMELINE_CTX, type TimelineContext } from "./timeline-root.svelte";

	interface Props {
		/**
		 * Content to render inside the connector (icon, avatar, or text).
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
	class={twMerge(ctx?.styles.connector(), className)}
	aria-hidden="true"
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</div>
