<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import {
		CHECKBOX_CARD_CTX,
		type CheckboxCardVariants,
	} from "./checkbox-card-root.svelte";
	import { Flex } from "$saas/layout/flex";

	const checkboxCardControl = tv({
		base: ["flex-1 relative rounded-md"],
		variants: {
			size: {
				sm: "gap-1.5 p-3",
				md: "gap-2.5 p-4",
				lg: "gap-3.5 p-4",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * Alignment of the control content.
		 * @default "start"
		 */
		align?: "start" | "center" | "end";
		/**
		 * The control content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		align = "start",
		children,
		class: className,
		...restProps
	}: Props = $props();

	const ctx = getContext<{ size: CheckboxCardVariants["size"] }>(
		CHECKBOX_CARD_CTX,
	);
	const size = $derived(ctx?.size ?? "md");

	const finalClass = $derived(
		twMerge(checkboxCardControl({ size }), className as string),
	);
</script>

<Flex inline {align} class={finalClass} aria-hidden="true" {...restProps}>
	{@render children()}
</Flex>
