<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { CARD_CTX, type CardVariants } from "./card-root.svelte";

const cardHeader = tv({
	base: ["flex flex-col gap-1"],
	variants: {
		size: {
			sm: "px-2.5 pt-2.5 pb-1.5",
			md: "px-4 pt-4 pb-2",
			lg: "px-6 pt-6 pb-3",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The header content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<{ size: CardVariants["size"] }>(CARD_CTX);
const size = $derived(ctx?.size ?? "md");

const finalClass = $derived(twMerge(cardHeader({ size }), className as string));
</script>

<div class={finalClass} {...restProps}>
	{@render children()}
</div>
