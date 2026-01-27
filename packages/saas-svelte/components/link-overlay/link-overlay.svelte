<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColourName } from "$saas/utils/colours";

	/**
	 * Tailwind Variants styles for the LinkOverlay component.
	 */
	export const linkOverlay = tv({
		base: [
			"cursor-pointer",
			"outline-0",
			"rounded",
			"antialiased",
			"focus:outline-offset-2",
			"focus:outline-1",
			"focus:outline-solid",
			"focus:outline-(--c-focus-ring)",
			// Pseudo-element that creates the overlay
			"before:content-['']",
			"before:cursor-inherit",
			"before:z-0",
			"before:w-full",
			"before:h-full",
			"before:block",
			"before:absolute",
			"before:left-0",
			"before:top-0",
			"before:no-underline",
		],
		variants: {
			variant: {
				/**
				 * No text styling - inherits from parent. Use when LinkOverlay is inside a heading.
				 */
				none: [],
				/**
				 * Always shows underline decoration.
				 */
				underline: [
					"text-(--c-fg)",
					"underline",
					"underline-offset-[3px]",
					"decoration-[color-mix(in_srgb,currentColor_20%,transparent)]",
				],
				/**
				 * Shows underline on hover.
				 */
				plain: [
					"text-(--c-fg)",
					"hover:underline-offset-[3px]",
					"hover:underline",
					"hover:decoration-[color-mix(in_srgb,currentColor_20%,transparent)]",
				],
			},
		},
		defaultVariants: {
			variant: "none",
		},
	});

	export type LinkOverlayVariants = VariantProps<typeof linkOverlay>;
</script>

<script lang="ts">
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getColourStyle } from "$saas/utils/colours";

	interface Props extends HTMLAnchorAttributes {
		/**
		 * The visual style of the link overlay.
		 * - "none": No styling, inherits from parent (use inside headings)
		 * - "underline": Always shows underline
		 * - "plain": Shows underline on hover
		 * @default "none"
		 */
		variant?: LinkOverlayVariants["variant"];
		/**
		 * The colour palette of the link overlay. Only applies when variant is "underline" or "plain".
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Content to render inside the link overlay.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		variant = "none",
		colour = "gray",
		class: className,
		children,
		style,
		...rest
	}: Props = $props();

	// Only apply colour styles when variant has text styling
	const shouldApplyColour = $derived(
		variant === "underline" || variant === "plain",
	);
	const colourVars = $derived(
		shouldApplyColour ? getColourStyle(colour) : "",
	);
	const finalClass = $derived(linkOverlay({ variant, class: className }));
	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<a class={finalClass} style={finalStyle} {...rest}>
	{@render children?.()}
</a>
