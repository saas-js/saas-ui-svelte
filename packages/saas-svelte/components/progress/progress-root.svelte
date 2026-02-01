<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const PROGRESS_CTX = Symbol("PROGRESS_CTX");

	/**
	 * Progress styles using tailwind-variants.
	 * Used to display the progress status for a task.
	 */
	export const progress = tv({
		slots: {
			root: "relative w-full text-fg-default leading-normal antialiased",
			track: "relative overflow-hidden",
			range: "h-full transition-[width] duration-(--durations-slow) ease-out",
			label: "font-medium inline-flex",
			valueText: "text-fg-muted font-medium tabular-nums leading-none",
		},
		variants: {
			/**
			 * The size of the progress bar.
			 * @default "md"
			 */
			size: {
				xs: {
					root: "text-xs",
					track: "h-1.5",
					label: "text-xs leading-xs mb-1.5",
					valueText: "text-2xs leading-2xs",
				},
				sm: {
					root: "text-xs",
					track: "h-2",
					label: "text-xs leading-xs mb-1.5",
					valueText: "text-xs leading-xs",
				},
				md: {
					root: "text-sm",
					track: "h-2.5",
					label: "text-sm leading-sm mb-2",
					valueText: "text-xs leading-xs",
				},
				lg: {
					root: "text-sm",
					track: "h-3",
					label: "text-sm leading-sm mb-2",
					valueText: "text-xs leading-xs",
				},
				xl: {
					root: "text-md",
					track: "h-3.5",
					label: "text-md leading-md mb-2.5",
					valueText: "text-sm leading-sm",
				},
			},
			/**
			 * The visual variant of the progress bar.
			 * @default "outline"
			 */
			variant: {
				outline: {
					track: "shadow-inner bg-bg-subtle",
					range: "bg-(--c-solid)",
				},
				subtle: {
					track: "bg-(--c-muted)",
					range: "bg-[color-mix(in_oklch,var(--c-solid)_72%,transparent)]",
				},
			},
			/**
			 * The shape of the progress bar.
			 * @default "rounded"
			 */
			shape: {
				square: {
					track: "rounded-none",
					range: "rounded-none",
				},
				rounded: {
					track: "rounded-sm",
					range: "rounded-sm",
				},
				full: {
					track: "rounded-full",
					range: "rounded-full",
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "outline",
			shape: "rounded",
		},
	});

	export type ProgressVariants = VariantProps<typeof progress>;

	export interface ProgressContext {
		styles: ReturnType<typeof progress>;
		value: number | null;
		min: number;
		max: number;
		striped: boolean;
		animated: boolean;
	}
</script>

<script lang="ts">
	import { Progress } from "@ark-ui/svelte/progress";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props {
		/**
		 * Content to render inside the progress (composition API).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The current value of the progress (0-100).
		 * Set to `null` for indeterminate state.
		 * @default 50
		 */
		value?: number | null;
		/**
		 * The minimum value.
		 * @default 0
		 */
		min?: number;
		/**
		 * The maximum value.
		 * @default 100
		 */
		max?: number;
		/**
		 * The size of the progress bar.
		 * @default "md"
		 */
		size?: ProgressVariants["size"];
		/**
		 * The visual variant of the progress bar.
		 * @default "outline"
		 */
		variant?: ProgressVariants["variant"];
		/**
		 * The shape of the progress bar.
		 * @default "rounded"
		 */
		shape?: ProgressVariants["shape"];
		/**
		 * The colour palette.
		 * @default "accent"
		 */
		colour?: ColourName;
		/**
		 * Whether to show stripes on the progress bar.
		 * @default false
		 */
		striped?: boolean;
		/**
		 * Whether to animate the stripes.
		 * @default false
		 */
		animated?: boolean;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		value = 50,
		min = 0,
		max = 100,
		size = "md",
		variant = "outline",
		shape = "rounded",
		colour = "accent",
		striped = false,
		animated = false,
		...restProps
	}: Props = $props();

	const classes = $derived(progress({ size, variant, shape }));
	const colourStyle = $derived(getColourStyle(colour));

	setContext<ProgressContext>(PROGRESS_CTX, {
		get styles() {
			return classes;
		},
		get value() {
			return value;
		},
		get min() {
			return min;
		},
		get max() {
			return max;
		},
		get striped() {
			return striped;
		},
		get animated() {
			return animated;
		},
	});
</script>

<Progress.Root
	{value}
	{min}
	{max}
	class={twMerge(classes.root(), className)}
	style={colourStyle}
	{...restProps}
>
	{@render children?.()}
</Progress.Root>
