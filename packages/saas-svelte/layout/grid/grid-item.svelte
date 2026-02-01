<script module lang="ts">
import { tv } from "tailwind-variants";

export const gridItem = tv({
	base: "block min-w-0",
});
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * The number of columns to span.
	 * @example 2 -> "span 2"
	 */
	colSpan?: number;
	/**
	 * The number of rows to span.
	 * @example 2 -> "span 2"
	 */
	rowSpan?: number;
	/**
	 * The starting column line.
	 */
	colStart?: number;
	/**
	 * The ending column line.
	 */
	colEnd?: number;
	/**
	 * The starting row line.
	 */
	rowStart?: number;
	/**
	 * The ending row line.
	 */
	rowEnd?: number;
	/**
	 * The content to render inside the grid item.
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
	colSpan,
	rowSpan,
	colStart,
	colEnd,
	rowStart,
	rowEnd,
	children,
	class: className,
	...restProps
}: Props = $props();

const gridColumn = $derived(
	colSpan
		? `span ${colSpan}`
		: colStart || colEnd
			? `${colStart ?? "auto"} / ${colEnd ?? "auto"}`
			: undefined,
);

const gridRow = $derived(
	rowSpan
		? `span ${rowSpan}`
		: rowStart || rowEnd
			? `${rowStart ?? "auto"} / ${rowEnd ?? "auto"}`
			: undefined,
);
</script>

<div
	class={twMerge(gridItem(), className)}
	style:grid-column={gridColumn}
	style:grid-row={gridRow}
	{...restProps}
>
	{@render children?.()}
</div>
