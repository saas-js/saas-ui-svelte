<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import { CARD_CTX, type CardVariants } from "./card-root.svelte";
	import { VStack } from "$saas/layout/stack";

	const cardHeader = tv({
		base: [],
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

	const finalClass = $derived(
		twMerge(cardHeader({ size }), className as string),
	);
</script>

<VStack gap={1} class={finalClass} {...restProps as Record<string, unknown>}>
	{@render children()}
</VStack>
