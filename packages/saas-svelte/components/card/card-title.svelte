<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const cardTitle = tv({
	base: ["wrap-break-word", "text-sm", "font-semibold"],
});

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

let { children, class: className, as: Element = "h3", ...restProps }: Props = $props();

const finalClass = $derived(twMerge(cardTitle(), className));
</script>

<svelte:element this={Element} class={finalClass} {...restProps}>
	{@render children()}
</svelte:element>
