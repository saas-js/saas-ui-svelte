<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The size of the square (width and height) using Tailwind spacing scale.
		 * @default 10
		 */
		size?: number;
		/**
		 * The content to render inside the square.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Additional HTML attributes to spread onto the element.
		 */
		[key: string]: unknown;
	}

	let { size = 10, children, class: className, ...restProps }: Props = $props();

	const sizeValue = $derived(size * 0.25);
</script>

<div
	class={twMerge("flex shrink-0 items-center justify-center", className)}
	style:width="{sizeValue}rem"
	style:height="{sizeValue}rem"
	{...restProps}
>
	{@render children?.()}
</div>
