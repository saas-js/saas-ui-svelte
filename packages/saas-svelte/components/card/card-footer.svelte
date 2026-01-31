<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { CARD_CTX, type CardVariants } from "./card-root.svelte";
import { HStack } from "$saas/layout/stack";

const cardFooter = tv({
	base: ["pt-2"],
	variants: {
		size: {
			sm: "px-2.5 pb-2.5",
			md: "px-4 pb-4",
			lg: "px-6 pb-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The footer content.
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

const finalClass = $derived(twMerge(cardFooter({ size }), className as string));
</script>

<HStack gap={2} class={finalClass} {...(restProps as Record<string, unknown>)}>
	{@render children()}
</HStack>
