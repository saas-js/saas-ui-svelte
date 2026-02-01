<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Heading } from "$saas/typography/heading";

	type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		/**
		 * The title content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The HTML element to render.
		 * @default "h3"
		 */
		as?: HeadingLevel;
	}

	let {
		children,
		class: className,
		as = "h3",
		...restProps
	}: Props = $props();

	const finalClass = $derived(twMerge("wrap-break-word", className));
</script>

<Heading
	{as}
	size="sm"
	class={finalClass}
	{...restProps as Record<string, unknown>}
>
	{@render children()}
</Heading>
