<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The aspect ratio of the container.
		 * Common values are: 21/9, 16/9, 9/16, 4/3, 1.85/1, 1
		 * @default 4/3
		 */
		ratio?: number;
		/**
		 * The content to render inside the aspect ratio container.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply to the outer container.
		 */
		class?: string;
		/**
		 * Additional HTML attributes to spread onto the element.
		 */
		[key: string]: unknown;
	}

	let {
		ratio = 4 / 3,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	class={twMerge(
		"relative flex items-center justify-center overflow-hidden",
		className,
	)}
	style="aspect-ratio: {ratio};"
	{...restProps}
>
	{@render children?.()}
</div>
