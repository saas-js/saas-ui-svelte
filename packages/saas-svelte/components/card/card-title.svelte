<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const cardTitle = tv({
	base: ["wrap-break-word", "text-sm", "font-semibold"],
});

interface Props extends HTMLAttributes<HTMLHeadingElement> {
	/**
	 * The title content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();

const finalClass = $derived(twMerge(cardTitle(), className));
</script>

<h3 class={finalClass} {...restProps}>
	{@render children()}
</h3>
