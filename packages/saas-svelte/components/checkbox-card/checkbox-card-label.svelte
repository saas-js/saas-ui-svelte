<script module lang="ts">
	import { tv } from "tailwind-variants";

	export const checkboxCardLabel = tv({
		base: "font-medium",
		variants: {
			disabled: {
				true: "opacity-50",
				false: "",
			},
		},
		defaultVariants: {
			disabled: false,
		},
	});
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		CHECKBOX_CARD_CTX,
		type CheckboxCardVariants,
	} from "./checkbox-card-root.svelte";
	import { HStack } from "$saas/layout/stack";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * The label content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<{
		size: CheckboxCardVariants["size"];
		disabled: boolean;
	}>(CHECKBOX_CARD_CTX);
	const disabled = $derived(ctx?.disabled ?? false);

	const finalClass = $derived(
		twMerge(checkboxCardLabel({ disabled }), className),
	);
</script>

<HStack as="span" gap={2} class={finalClass} {...restProps}>
	{@render children()}
</HStack>
