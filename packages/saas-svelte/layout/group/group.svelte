<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const group = tv({
		base: "inline-flex relative isolate items-center justify-start",
		variants: {
			attached: {
				true: [
					"isolate", // Creates a new stacking context for z-index management
					"-space-x-px", // Negative margin for horizontal overlap
					// First item styling
					"[&>*:first-child]:rounded-r-none",
					// Last item styling
					"[&>*:last-child]:rounded-l-none",
					// Middle items styling
					"[&>*:not(:first-child):not(:last-child)]:rounded-none",
					// Focus management: bring focused item to front so border sits on top
					"*:focus-visible:z-10",
					"*:focus-within:z-10",
				],
				false: "gap-2",
			},
			grow: {
				true: "w-full *:flex-1",
				false: "",
			},
			orientation: {
				horizontal: "flex-row",
				vertical: "flex-col",
			},
		},
		compoundVariants: [
			{
				attached: true,
				orientation: "vertical",
				class: [
					"space-x-0 -space-y-px", // Reset x-space, set y-space
					"[&>*:first-child]:rounded-r-l2 [&>*:first-child]:rounded-bl-none",
					"[&>*:last-child]:rounded-l-l2 [&>*:last-child]:rounded-tr-none",
					"[&>*:not(:first-child):not(:last-child)]:rounded-none",
				],
			},
		],
		defaultVariants: {
			attached: false,
			grow: false,
			orientation: "horizontal",
		},
	});

	export type GroupVariants = VariantProps<typeof group>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
		/**
		 * The content to render inside the group.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * If `true`, the elements will be attached together.
		 * @default false
		 */
		attached?: boolean;
		/**
		 * If `true`, the elements will grow to fill the available space.
		 * @default false
		 */
		grow?: boolean;
		/**
		 * The orientation of the group.
		 * @default "horizontal"
		 */
		orientation?: GroupVariants["orientation"];
		/**
		 * The gap between items (uses Tailwind spacing scale).
		 * Only applies when `attached` is false.
		 */
		gap?: number;
	}

	let {
		children,
		class: className,
		attached = false,
		grow = false,
		orientation = "horizontal",
		gap,
		...restProps
	}: Props = $props();

	const classes = $derived(
		twMerge(group({ attached, grow, orientation }), className) as string,
	);

	// Calculate gap style - only apply when not attached and gap is provided
	const gapStyle = $derived(
		!attached && gap !== undefined ? `${gap * 0.25}rem` : undefined,
	);
</script>

<div class={classes} style:gap={gapStyle} {...restProps}>
	{@render children?.()}
</div>
