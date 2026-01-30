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

const checkboxCardAddon = tv({
	base: ["border-t border-border-default peer-disabled:opacity-50"],
	variants: {
		size: {
			sm: "px-3 py-2",
			md: "px-4 py-2",
			lg: "px-4 py-3",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The addon content.
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
const size = $derived(ctx?.size ?? "md");
const disabled = $derived(ctx?.disabled ?? false);

const finalClass = $derived(twMerge(checkboxCardAddon({ size }), className as string));
</script>

<div class={finalClass} class:opacity-50={disabled} {...restProps}>
	{@render children()}
</div>
