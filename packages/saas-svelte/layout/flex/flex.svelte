<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const flex = tv({
	base: "",
	variants: {
		inline: {
			true: "inline-flex",
			false: "flex",
		},
		direction: {
			row: "flex-row",
			column: "flex-col",
			"row-reverse": "flex-row-reverse",
			"column-reverse": "flex-col-reverse",
		},
		align: {
			start: "items-start",
			center: "items-center",
			end: "items-end",
			stretch: "items-stretch",
			baseline: "items-baseline",
		},
		justify: {
			start: "justify-start",
			center: "justify-center",
			end: "justify-end",
			between: "justify-between",
			around: "justify-around",
			evenly: "justify-evenly",
		},
		wrap: {
			wrap: "flex-wrap",
			nowrap: "flex-nowrap",
			"wrap-reverse": "flex-wrap-reverse",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

export type FlexVariants = VariantProps<typeof flex>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * The flex direction.
	 */
	direction?: FlexVariants["direction"];
	/**
	 * Shorthand for alignItems.
	 */
	align?: FlexVariants["align"];
	/**
	 * Shorthand for justifyContent.
	 */
	justify?: FlexVariants["justify"];
	/**
	 * Shorthand for flexWrap.
	 */
	wrap?: FlexVariants["wrap"];
	/**
	 * Shorthand for flexBasis.
	 */
	basis?: string;
	/**
	 * Shorthand for flexGrow.
	 */
	grow?: boolean | number;
	/**
	 * Shorthand for flexShrink.
	 */
	shrink?: boolean | number;
	/**
	 * The gap between children.
	 */
	gap?: number | string;
	/**
	 * Whether to use inline-flex instead of flex.
	 * @default false
	 */
	inline?: boolean;
	/**
	 * The content to render inside the flex container.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional HTML attributes to spread onto the element.
	 */
	[key: string]: unknown;
}

let {
	direction,
	align,
	justify,
	wrap,
	basis,
	grow,
	shrink,
	gap,
	inline = false,
	children,
	class: className,
	style,
	...restProps
}: Props = $props();

// Build gap class
const gapClass = $derived.by(() => {
	if (gap === undefined) return undefined;
	if (typeof gap === "number") return `gap-${gap}`;
	return `gap-[${gap}]`;
});

const finalClass = $derived(
	twMerge(
		flex({
			inline,
			direction,
			align,
			justify,
			wrap,
		}),
		gapClass,
		className,
	),
);

// Build style string for properties that need exact values
const styleProps = $derived.by(() => {
	const styles: string[] = [];
	if (basis) styles.push(`flex-basis: ${basis}`);
	if (grow !== undefined)
		styles.push(`flex-grow: ${grow === true ? 1 : grow}`);
	if (shrink !== undefined)
		styles.push(`flex-shrink: ${shrink === true ? 1 : shrink}`);
	if (style) styles.push(style as string);
	return styles.length > 0 ? styles.join("; ") : undefined;
});
</script>

<div class={finalClass} style={styleProps} {...restProps}>
	{@render children?.()}
</div>
