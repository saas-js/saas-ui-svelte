<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAnchorAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

export const link = tv({
	base: [
		"cursor-pointer",
		"text-(--c-fg)",
		"outline-0",
		"items-center",
		"gap-1.5",
		"inline-flex",
		"rounded",
		"focus-visible:outline-offset-2",
		"focus-visible:outline-1",
		"focus-visible:outline-solid",
		"focus-visible:outline-(--c-focus-ring)",
		"antialiased",
	],
	variants: {
		variant: {
			underline: [
				"underline",
				"underline-offset-[3px]",
				"decoration-[color-mix(in_srgb,currentColor_20%,transparent)]",
			],
			plain: [
				"hover:underline-offset-[3px]",
				"hover:underline",
				"hover:decoration-[color-mix(in_srgb,currentColor_20%,transparent)]",
			],
		},
	},
	defaultVariants: {
		variant: "underline",
	},
});

export type LinkVariants = VariantProps<typeof link>;
</script>

<script lang="ts">
interface Props extends HTMLAnchorAttributes {
	/**
	 * The visual style of the link.
	 * @default "underline"
	 */
	variant?: LinkVariants["variant"];
	/**
	 * The colour palette of the link.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Content to render inside the link.
	 */
	children?: Snippet;
}

let {
	variant = "underline",
	colour = "gray",
	class: className,
	children,
	style,
	...rest
}: Props = $props();

const colourVars = $derived(getColourStyle(colour));

const finalClass = $derived(link({ variant, class: className as string }));

const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<a class={finalClass} style={finalStyle} {...rest}>
	{@render children?.()}
</a>
