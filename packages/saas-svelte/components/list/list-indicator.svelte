<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Tailwind Variants styles for the List indicator component.
 */
export const listIndicator = tv({
	base: [
		"shrink-0",
		"inline-block",
		"mr-2",
		"h-lh",
		"min-h-lh",
		"antialiased",
	],
	variants: {
		size: {
			xs: "w-3",
			sm: "w-3.5",
			md: "w-4",
			lg: "w-5",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

export type ListIndicatorVariants = VariantProps<typeof listIndicator>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import type { ColourName } from "$saas/utils/colours";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * The content to render inside the indicator (usually an icon).
	 */
	children?: Snippet;
	/**
	 * The size of the indicator icon.
	 * @default "sm"
	 */
	size?: ListIndicatorVariants["size"];
	/**
	 * The colour of the indicator (uses the 500 shade).
	 */
	colour?: ColourName;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional inline styles.
	 */
	style?: string;
}

let {
	children,
	size = "sm",
	colour,
	class: className,
	style,
	...restProps
}: Props = $props();

// Use the 500 shade - same value in both light and dark mode
const colourStyle = $derived(colour ? `color: var(--color-${colour}-500)` : "");
const finalStyle = $derived([colourStyle, style].filter(Boolean).join("; "));
const finalClass = $derived(twMerge(listIndicator({ size }), className));
</script>

<span class={finalClass} style={finalStyle || undefined} {...restProps}>
	{@render children?.()}
</span>
