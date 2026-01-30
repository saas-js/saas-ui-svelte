<script module lang="ts">
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind Variants styles for the GridList cell component.
 */
export const gridListCell = tv({
	base: ["antialiased"],
	variants: {
		flex: {
			"1": "flex-1",
			none: "",
		},
		shrink: {
			true: "shrink-0",
			false: "",
		},
	},
	defaultVariants: {
		flex: "none",
		shrink: false,
	},
});
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The content to render inside the cell.
	 */
	children: Snippet;
	/**
	 * The flex value for the cell.
	 * @default "none"
	 */
	flex?: "1" | "none";
	/**
	 * Whether the cell should shrink.
	 * @default false
	 */
	shrink?: boolean;
	/**
	 * The width of the cell (e.g., "8" for w-8).
	 */
	width?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	children,
	flex = "none",
	shrink = false,
	width,
	class: className,
	...restProps
}: Props = $props();

const widthClass = $derived(width ? `w-${width}` : "");
</script>

<div
	role="gridcell"
	class={twMerge(gridListCell({ flex, shrink }), widthClass, className as string)}
	{...restProps}
>
	{@render children()}
</div>
