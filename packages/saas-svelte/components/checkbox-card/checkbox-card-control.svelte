<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import {
	CHECKBOX_CARD_CTX,
	type CheckboxCardVariants,
} from "./checkbox-card-root.svelte";

const checkboxCardControl = tv({
	base: ["flex-1 items-start inline-flex relative rounded-md"],
	variants: {
		size: {
			sm: "gap-1.5 p-3",
			md: "gap-2.5 p-4",
			lg: "gap-3.5 p-4",
		},
		align: {
			start: "items-start",
			center: "items-center",
			end: "items-end",
		},
	},
	defaultVariants: {
		size: "md",
		align: "start",
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
	checkboxCardControl({ size, align, class: className }),
);
</script>

<div class={finalClass} aria-hidden="true" {...restProps}>
	{@render children()}
</div>
