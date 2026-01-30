<script lang="ts">
	import { type VariantProps, tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { SvelteHTMLElements } from "svelte/elements";

	const stack = tv({
		base: "flex",
		variants: {
			direction: {
				row: "flex-row",
				column: "flex-col",
				"row-reverse": "flex-row-reverse",
				"col-reverse": "flex-col-reverse",
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
			},
			wrap: {
				wrap: "flex-wrap",
				nowrap: "flex-nowrap",
				"wrap-reverse": "flex-wrap-reverse",
			},
		},
		defaultVariants: {
			direction: "column",
			align: "stretch",
			justify: "start",
		},
	});

	type StackVariants = VariantProps<typeof stack>;

	interface Props extends HTMLAttributes<HTMLElement> {
		/**
		 * The HTML element to render.
		 * @default "div"
		 */
		as?: keyof SvelteHTMLElements;
		/**
		 * The content to render.
		 */
		children?: Snippet;
		/**
		 * The direction of the stack.
		 * @default "column"
		 */
		direction?: StackVariants["direction"];
		/**
		 * The alignment of items within the stack.
		 * @default "stretch"
		 */
		align?: StackVariants["align"];
		/**
		 * The distribution of items within the stack.
		 * @default "start"
		 */
		justify?: StackVariants["justify"];
		/**
		 * Whether items should wrap to the next line.
		 */
		wrap?: StackVariants["wrap"];
		/**
		 * The gap between items (uses Tailwind spacing scale).
		 * @default 2
		 */
		gap?: number;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		as = "div",
		children,
		direction = "column",
		align,
		justify,
		wrap,
		gap = 2,
		class: className,
		...restProps
	}: Props = $props();
</script>

<svelte:element
	this={as}
	class={twMerge(stack({ direction, align, justify, wrap }), className)}
	style:gap="{gap * 0.25}rem"
	{...restProps}
>
	{@render children?.()}
</svelte:element>
