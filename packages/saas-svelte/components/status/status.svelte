<script lang="ts">
	import type { Snippet } from "svelte";
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";
	import { Box } from "$saas/layout/box";

	const status = tv({
		slots: {
			root: ["items-center", "gap-2", "inline-flex", "antialiased"],
			indicator: ["shrink-0", "rounded-full", "forced-color-adjust-none"],
		},
		variants: {
			/**
			 * The size of the status indicator.
			 * @default "md"
			 */
			size: {
				sm: {
					root: ["text-xs", "leading-xs"],
					indicator: ["size-2"],
				},
				md: {
					root: ["text-sm", "leading-sm"],
					indicator: ["size-2"],
				},
				lg: {
					root: ["text-sm", "leading-sm"],
					indicator: ["size-2.5"],
				},
			},
			/**
			 * The status value determining the indicator colour.
			 * @default "info"
			 */
			value: {
				error: {
					indicator: ["bg-status-error"],
				},
				info: {
					indicator: ["bg-status-info"],
				},
				warning: {
					indicator: ["bg-status-warning"],
				},
				success: {
					indicator: ["bg-status-success"],
				},
			},
			coloured: {
				true: {
					indicator: ["bg-(--c-solid)"],
				},
				false: {},
			},
		},
		defaultVariants: {
			size: "md",
			value: "info",
			coloured: false,
		},
	});

	type StatusVariants = VariantProps<typeof status>;

	interface Props {
		/**
		 * The label content of the status.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the status indicator.
		 * @default "md"
		 */
		size?: StatusVariants["size"];
		/**
		 * The status value determining the indicator colour.
		 * @default "info"
		 */
		value?: StatusVariants["value"];
		/**
		 * The colour palette to use for the indicator. Overrides the value colour.
		 */
		colour?: ColourName;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		size = "md",
		value = "info",
		colour,
		...restProps
	}: Props = $props();

	const styles = $derived(
		status({ size, value: colour ? undefined : value, coloured: !!colour }),
	);
	const colourStyle = $derived(colour ? getColourStyle(colour) : undefined);
</script>

<Box as="span" class={twMerge(styles.root(), className)} {...restProps}>
	<Box
		as="span"
		class={styles.indicator()}
		style={colourStyle}
		aria-hidden="true"
	/>
	{@render children?.()}
</Box>
