<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { CARD_CTX, type CardVariants } from "./card-root.svelte";

const cardBody = tv({
	base: ["flex-col flex-1 flex"],
	variants: {
		size: {
			sm: "pt-2.5 px-2.5 pb-1.5",
			md: "pt-4 px-4 pb-2",
			lg: "pt-6 px-6 pb-3",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

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

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<{ size: CardVariants["size"] }>(CARD_CTX);
const size = $derived(ctx?.size ?? "md");

const finalClass = $derived(twMerge(cardBody({ size }), className as string));
</script>

<div class={finalClass} {...restProps}>
	{@render children()}
</div>
