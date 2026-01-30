<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Spinner styles using tailwind-variants.
 * Used to provide a visual cue that an action is processing.
 */
export const spinner = tv({
	base: [
		"inline-block",
		"rounded-full",
		"border-2",
		"border-solid",
		"border-l-transparent",
		"border-b-transparent",
		"border-r-current",
		"border-t-current",
		"animate-spin",
	],
	variants: {
		/**
		 * The size of the spinner.
		 * @default "md"
		 */
		size: {
			xs: "size-3",
			sm: "size-4",
			md: "size-5",
			lg: "size-8",
			xl: "size-10",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type SpinnerVariants = VariantProps<typeof spinner>;
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * The size of the spinner.
	 * @default "md"
	 */
	size?: SpinnerVariants["size"];
	/**
	 * The colour palette.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Accessible label for the spinner.
	 * @default "Loading"
	 */
	label?: string;
	/**
	 * The animation duration.
	 * @default "0.5s"
	 */
	animationDuration?: string;
	/**
	 * The border width (thickness) of the spinner.
	 * @default "2px"
	 */
	borderWidth?: string;
	/**
	 * The track colour palette (the non-spinning part).
	 * When specified, uses the 200 shade of the colour.
	 */
	trackColour?: ColourName;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	size = "md",
	colour = "gray",
	label = "Loading",
	animationDuration = "0.5s",
	borderWidth = "2px",
	trackColour,
	class: className,
	...restProps
}: Props = $props();

const colourStyle = $derived(getColourStyle(colour));
const trackBorderStyle = $derived(
	trackColour
		? `border-bottom-color: var(--color-${trackColour}-200); border-left-color: var(--color-${trackColour}-200);`
		: "",
);
</script>

<span
	role="status"
	aria-label={label}
	class={spinner({ size, class: className })}
	style="{colourStyle}; color: var(--c-fg); animation-duration: {animationDuration}; border-width: {borderWidth}; {trackBorderStyle}"
	{...restProps}
></span>
