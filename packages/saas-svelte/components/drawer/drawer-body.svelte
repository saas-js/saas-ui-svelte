<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { Box } from "$saas/layout/box";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The body content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Box
	class={twMerge(
		"flex-1 overflow-y-auto py-2 ps-6 pe-6 antialiased",
		className,
	)}
	{...rest}
>
	{@render children()}
</Box>
