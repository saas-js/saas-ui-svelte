<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { tv } from "tailwind-variants";
import {
	CHECKBOX_CARD_CTX,
	type CheckboxCardVariants,
} from "./checkbox-card-root.svelte";

const checkboxCardContent = tv({
	base: ["gap-1 flex-col flex-1 items-start flex"],
	variants: {
		size: {
			sm: "",
			md: "",
			lg: "",
		},
		align: {
			start: "items-start text-start",
			center: "items-center text-center",
			end: "items-end text-end",
		},
	},
	defaultVariants: {
		size: "md",
		align: "start",
	},
});

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Alignment of the content.
	 * @default "start"
	 */
	align?: "start" | "center" | "end";
	/**
	 * The content.
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
	checkboxCardContent({ size, align, class: className }),
);
</script>

<div class={finalClass} {...restProps}>
	{@render children()}
</div>
