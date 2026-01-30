<script module lang="ts">
import { tv } from "tailwind-variants";

/**
 * Tailwind Variants styles for the LinkBox component.
 */
export const linkBox = tv({
	base: [
		"relative",
		// Elevate all direct children above the overlay pseudo-element (z-0)
		// This makes content selectable while preserving the link overlay behavior
		"*:relative",
		"*:z-1",
	],
});
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
	/**
	 * The HTML element to render.
	 * @default "div"
	 */
	as?: "div" | "article" | "section" | "aside" | "figure";
	/**
	 * Content to render inside the link box.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { as = "div", children, class: className, ...rest }: Props = $props();

const classes = $derived(twMerge(linkBox(), className as string));
</script>

{#if as === "article"}
	<article class={classes} {...rest}>
		{@render children?.()}
	</article>
{:else if as === "section"}
	<section class={classes} {...rest}>
		{@render children?.()}
	</section>
{:else if as === "aside"}
	<aside class={classes} {...rest}>
		{@render children?.()}
	</aside>
{:else if as === "figure"}
	<figure class={classes} {...rest}>
		{@render children?.()}
	</figure>
{:else}
	<div class={classes} {...rest}>
		{@render children?.()}
	</div>
{/if}
