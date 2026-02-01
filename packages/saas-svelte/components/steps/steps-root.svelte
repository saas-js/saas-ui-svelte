<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const STEPS_CTX = Symbol("STEPS_CTX");

	/**
	 * Steps styles using tailwind-variants.
	 * Used to display progress through a multi-step process.
	 */
	export const steps = tv({
		slots: {
			root: "flex w-full antialiased",
			list: "flex justify-between items-center",
			item: "flex flex-1 shrink-0 basis-0 items-center relative",
			trigger:
				"flex items-center gap-3 rounded focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-accent-focus-ring",
			indicator:
				"shrink-0 flex items-center justify-center font-medium rounded-full transition-colors duration-200",
			separator: "flex-1 h-0.5 mx-3 transition-colors duration-200",
			content:
				"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-accent-focus-ring",
			title: "font-medium text-left",
			description: "text-fg-muted text-left",
		},
		variants: {
			/**
			 * The size of the steps.
			 * @default "md"
			 */
			size: {
				sm: {
					root: "gap-3",
					list: "text-xs leading-xs",
					indicator: "size-8 text-xs",
					title: "text-sm leading-sm",
					description: "text-xs leading-xs",
				},
				md: {
					root: "gap-4",
					list: "text-sm leading-sm",
					indicator: "size-10 text-sm",
					title: "text-sm leading-sm",
					description: "text-xs leading-xs",
				},
				lg: {
					root: "gap-6",
					list: "text-sm leading-md",
					indicator: "size-11 text-md",
					title: "text-sm leading-md",
					description: "text-sm leading-sm",
				},
			},
			/**
			 * The visual variant of the steps.
			 * @default "solid"
			 */
			variant: {
				subtle: {
					indicator: "",
				},
				solid: {
					indicator: "",
				},
			},
			/**
			 * The orientation of the steps.
			 * @default "horizontal"
			 */
			orientation: {
				horizontal: {
					root: "flex-col",
					list: "flex-row",
					item: "flex-row",
					separator: "h-0.5 w-full",
				},
				vertical: {
					root: "flex-row",
					list: "flex-col items-start",
					item: "flex-col items-start",
					separator: "w-0.5 h-full absolute top-13",
				},
			},
		},
		compoundVariants: [
			// Vertical separator positioning per size (center under indicator)
			{
				orientation: "vertical",
				size: "sm",
				class: {
					separator: "mx-0 left-3.75 max-h-[calc(100%-3rem)]",
				},
			},
			{
				orientation: "vertical",
				size: "md",
				class: {
					separator: "mx-0 left-4.75 max-h-[calc(100%-4rem)]",
				},
			},
			{
				orientation: "vertical",
				size: "lg",
				class: {
					separator: "mx-0 left-5.25 max-h-[calc(100%-4.5rem)]",
				},
			},
		],
		defaultVariants: {
			size: "md",
			variant: "solid",
			orientation: "horizontal",
		},
	});

	export type StepsVariants = VariantProps<typeof steps>;

	export interface StepsContext {
		styles: ReturnType<typeof steps>;
		colour: string;
		orientation: "horizontal" | "vertical";
		variant: "subtle" | "solid";
		onPrefetch?: (index: number) => void;
	}
</script>

<script lang="ts">
	import { Steps } from "@ark-ui/svelte/steps";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props {
		/**
		 * Content to render inside the steps (composition API).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The total number of steps.
		 */
		count: number;
		/**
		 * The initial step (0-indexed).
		 * @default 0
		 */
		defaultStep?: number;
		/**
		 * The controlled current step.
		 */
		step?: number;
		/**
		 * The size of the steps.
		 * @default "md"
		 */
		size?: StepsVariants["size"];
		/**
		 * The visual variant.
		 * @default "solid"
		 */
		variant?: StepsVariants["variant"];
		/**
		 * The orientation.
		 * @default "horizontal"
		 */
		orientation?: "horizontal" | "vertical";
		/**
		 * The colour palette.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the steps must be completed in order.
		 * @default false
		 */
		linear?: boolean;
		/**
		 * Callback when the step changes.
		 */
		onStepChange?: (details: { step: number }) => void;
		/**
		 * Callback when all steps are completed.
		 */
		onStepComplete?: () => void;
		/**
		 * Callback invoked when hovering over a step (for prefetching content).
		 * Similar to Astro's link prefetching, this allows preloading data before selection.
		 */
		onPrefetch?: (index: number) => void;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		count,
		defaultStep = 0,
		step,
		size = "md",
		variant = "solid",
		orientation = "horizontal",
		colour = "gray",
		linear = false,
		onStepChange,
		onStepComplete,
		onPrefetch,
		...restProps
	}: Props = $props();

	const classes = $derived(steps({ size, variant, orientation }));
	const colourStyle = $derived(getColourStyle(colour));

	setContext<StepsContext>(STEPS_CTX, {
		get styles() {
			return classes;
		},
		get colour() {
			return colour;
		},
		get orientation() {
			return orientation;
		},
		get variant() {
			return variant;
		},
		get onPrefetch() {
			return onPrefetch;
		},
	});
</script>

<Steps.Root
	{count}
	{defaultStep}
	{step}
	{linear}
	{orientation}
	{onStepChange}
	{onStepComplete}
	class={twMerge(classes.root(), className)}
	style={colourStyle}
	{...restProps}
>
	{@render children?.()}
</Steps.Root>
