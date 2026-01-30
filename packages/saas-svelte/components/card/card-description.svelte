<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const cardDescription = tv({
	base: ["wrap-break-word", "text-fg-muted", "text-sm"],
});

interface Props extends HTMLAttributes<HTMLParagraphElement> {
	/**
	 * The description content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();

const finalClass = $derived(twMerge(cardDescription(), className));
</script>

<p class={finalClass} {...restProps}>
	{@render children()}
</p>
