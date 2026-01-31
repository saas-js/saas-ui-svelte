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

const finalClass = $derived(twMerge("font-medium disabled:opacity-50", disabled && "opacity-50", className as string));
</script>

<HStack as="span" gap={2} class={finalClass} {...restProps}>
	{@render children()}
</HStack>
