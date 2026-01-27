<script lang="ts">
	import type { Snippet } from "svelte";
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

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
					indicator: ["w-2", "h-2"],
				},
				md: {
					root: ["text-sm", "leading-sm"],
					indicator: ["w-2", "h-2"],
				},
				lg: {
					root: ["text-sm", "leading-sm"],
					indicator: ["w-2.5", "h-2.5"],
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
		},
		defaultVariants: {
			size: "md",
			value: "info",
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
		status({ size, value: colour ? undefined : value }),
	);
	const colourStyle = $derived(colour ? getColourStyle(colour) : undefined);
</script>

<span class={twMerge(styles.root(), className)} {...restProps}>
	<span
		class={twMerge(styles.indicator(), colour && "bg-(--c-solid)")}
		style={colourStyle}
		aria-hidden="true"
	></span>
	{#if children}
		{@render children()}
	{/if}
</span>
