<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const grid = tv({
	base: "",
	variants: {
		inline: {
			true: "inline-grid",
			false: "grid",
		},
	},
	defaultVariants: {
		inline: false,
	},
});

export type GridVariants = VariantProps<typeof grid>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * The number of columns in the grid template.
	 * Can be a number (for equal columns) or a string (for custom template).
	 * @example 3 -> "repeat(3, 1fr)"
	 * @example "200px 1fr 2fr"
	 */
	columns?: number | string;
	/**
	 * The number of rows in the grid template.
	 * Can be a number (for equal rows) or a string (for custom template).
	 * @example 2 -> "repeat(2, 1fr)"
	 */
	rows?: number | string;
	/**
	 * The gap between grid items (uses Tailwind spacing scale).
	 * @default 4
	 */
	gap?: number;
	/**
	 * The column gap between grid items (uses Tailwind spacing scale).
	 * Overrides gap for columns if specified.
	 */
	gapX?: number;
	/**
	 * The row gap between grid items (uses Tailwind spacing scale).
	 * Overrides gap for rows if specified.
	 */
	gapY?: number;
	/**
	 * Whether to display as inline-grid instead of grid.
	 * @default false
	 */
	inline?: boolean;
	/**
	 * The content to render inside the grid.
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
	columns,
	rows,
	gap = 4,
	gapX,
	gapY,
	inline = false,
	children,
	class: className,
	...restProps
}: Props = $props();

const getTemplate = (value: number | string | undefined) => {
	if (value === undefined) return undefined;
	if (typeof value === "number") return `repeat(${value}, 1fr)`;
	return value;
};

const templateColumns = $derived(getTemplate(columns));
const templateRows = $derived(getTemplate(rows));
const columnGap = $derived((gapX ?? gap) * 0.25);
const rowGap = $derived((gapY ?? gap) * 0.25);
</script>

<div
	class={twMerge(grid({ inline }), className)}
	style:grid-template-columns={templateColumns}
	style:grid-template-rows={templateRows}
	style:column-gap="{columnGap}rem"
	style:row-gap="{rowGap}rem"
	{...restProps}
>
	{@render children?.()}
</div>
