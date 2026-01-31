<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const CARD_CTX = Symbol("CARD_CTX");

export const cardRoot = tv({
	base: [
		"wrap-break-word",
		"text-fg-default",
		"bg-bg-panel",
		"relative",
		"rounded-lg",
		"antialiased",
	],
	variants: {
		variant: {
			subtle: "bg-bg-subtle",
			outline: "border border-border-default",
			elevated: "shadow-md border-[0.5px] border-border-default",
		},
		size: {
			sm: "",
			md: "",
			lg: "",
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "md",
	},
});

export type CardVariants = VariantProps<typeof cardRoot>;
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { setContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { Flex } from "$saas/layout/flex";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The card content.
	 */
	children: Snippet;
	/**
	 * The visual style of the card.
	 * @default "outline"
	 */
	variant?: CardVariants["variant"];
	/**
	 * The size of the card.
	 * @default "md"
	 */
	size?: CardVariants["size"];
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Inline styles to apply to the card.
	 */
	style?: string;
}

let {
	children,
	variant = "outline",
	size = "md",
	class: className,
	style,
	...restProps
}: Props = $props();

const finalClass = $derived(twMerge(cardRoot({ variant, size }), className as string));

// Set context for child components using getter pattern for reactivity
setContext(CARD_CTX, {
	get size() {
		return size;
	},
	get variant() {
		return variant;
	},
});
</script>

<Flex direction="column" class={finalClass} style={style} {...restProps}>
	{@render children()}
</Flex>
