<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import {
	CHECKBOX_CARD_CTX,
	type CheckboxCardVariants,
} from "./checkbox-card-root.svelte";

const checkboxCardLabel = tv({
	base: [
		"items-center",
		"gap-2",
		"font-medium",
		"flex",
		"disabled:opacity-50",
	],
	variants: {
		size: {
			sm: "",
			md: "",
			lg: "",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

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
const size = $derived(ctx?.size ?? "md");
const disabled = $derived(ctx?.disabled ?? false);

const finalClass = $derived(checkboxCardLabel({ size, class: className }));
</script>

<span class={finalClass} class:opacity-50={disabled} {...restProps}>
	{@render children()}
</span>
