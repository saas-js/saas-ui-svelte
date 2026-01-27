<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * The flex direction.
		 */
		direction?: "row" | "column" | "row-reverse" | "column-reverse";
		/**
		 * Shorthand for alignItems.
		 */
		align?: "start" | "center" | "end" | "stretch" | "baseline";
		/**
		 * Shorthand for justifyContent.
		 */
		justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
		/**
		 * Shorthand for flexWrap.
		 */
		wrap?: "wrap" | "nowrap" | "wrap-reverse";
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

	const directionMap = {
		row: "flex-row",
		column: "flex-col",
		"row-reverse": "flex-row-reverse",
		"column-reverse": "flex-col-reverse",
	} as const;

	const alignMap = {
		start: "items-start",
		center: "items-center",
		end: "items-end",
		stretch: "items-stretch",
		baseline: "items-baseline",
	} as const;

	const justifyMap = {
		start: "justify-start",
		center: "justify-center",
		end: "justify-end",
		between: "justify-between",
		around: "justify-around",
		evenly: "justify-evenly",
	} as const;

	const wrapMap = {
		wrap: "flex-wrap",
		nowrap: "flex-nowrap",
		"wrap-reverse": "flex-wrap-reverse",
	} as const;

	// Build style string for properties that need exact values
	const styleProps = $derived.by(() => {
		const styles: string[] = [];
		if (basis) styles.push(`flex-basis: ${basis}`);
		if (grow !== undefined) styles.push(`flex-grow: ${grow === true ? 1 : grow}`);
		if (shrink !== undefined) styles.push(`flex-shrink: ${shrink === true ? 1 : shrink}`);
		if (style) styles.push(style as string);
		return styles.length > 0 ? styles.join("; ") : undefined;
	});

	// Build gap class
	const gapClass = $derived.by(() => {
		if (gap === undefined) return undefined;
		if (typeof gap === "number") return `gap-${gap}`;
		return `gap-[${gap}]`;
	});
</script>

<div
	class={twMerge(
		inline ? "inline-flex" : "flex",
		direction && directionMap[direction],
		align && alignMap[align],
		justify && justifyMap[justify],
		wrap && wrapMap[wrap],
		gapClass,
		className,
	)}
	style={styleProps}
	{...restProps}
>
	{@render children?.()}
</div>
