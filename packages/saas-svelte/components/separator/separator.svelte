<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	/**
	 * Separator styles using tailwind-variants.
	 * Used to visually separate content.
	 */
	export const separator = tv({
		base: "block antialiased border-border-default",
		variants: {
			/**
			 * The orientation of the separator.
			 * @default "horizontal"
			 */
			orientation: {
				horizontal: "w-full border-t",
				vertical: "h-4 border-l self-stretch",
			},
			/**
			 * The visual variant of the separator.
			 * @default "solid"
			 */
			variant: {
				solid: "border-solid",
				dashed: "border-dashed",
				dotted: "border-dotted",
			},
			/**
			 * The thickness of the separator.
			 * @default "sm"
			 */
			size: {
				xs: "",
				sm: "",
				md: "",
				lg: "",
			},
		},
		compoundVariants: [
			// Horizontal sizes
			{
				orientation: "horizontal",
				size: "xs",
				class: "border-t-[0.5px]",
			},
			{ orientation: "horizontal", size: "sm", class: "border-t" },
			{ orientation: "horizontal", size: "md", class: "border-t-2" },
			{ orientation: "horizontal", size: "lg", class: "border-t-[3px]" },
			// Vertical sizes
			{ orientation: "vertical", size: "xs", class: "border-l-[0.5px]" },
			{ orientation: "vertical", size: "sm", class: "border-l" },
			{ orientation: "vertical", size: "md", class: "border-l-2" },
			{ orientation: "vertical", size: "lg", class: "border-l-[3px]" },
		],
		defaultVariants: {
			orientation: "horizontal",
			variant: "solid",
			size: "sm",
		},
	});

	export type SeparatorVariants = VariantProps<typeof separator>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "class"> {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The orientation of the separator.
		 * @default "horizontal"
		 */
		orientation?: SeparatorVariants["orientation"];
		/**
		 * The visual variant of the separator.
		 * @default "solid"
		 */
		variant?: SeparatorVariants["variant"];
		/**
		 * The thickness of the separator.
		 * @default "sm"
		 */
		size?: SeparatorVariants["size"];
		/**
		 * The colour palette of the separator.
		 * @default "gray"
		 */
		colour?: ColourName;
	}

	let {
		class: className,
		orientation = "horizontal",
		variant = "solid",
		size = "sm",
		colour,
		...restProps
	}: Props = $props();

	const classes = $derived(
		twMerge(
			separator({ orientation, variant, size }),
			colour && "border-(--c-border)",
			className,
		),
	);

	const colourStyle = $derived(colour ? getColourStyle(colour) : undefined);
</script>

<span
	role="separator"
	aria-orientation={orientation}
	class={classes}
	style={colourStyle}
	{...restProps}
></span>
