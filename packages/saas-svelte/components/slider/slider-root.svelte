<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const SLIDER_CTX = Symbol("SLIDER_CTX");

	/**
	 * Slider styles using tailwind-variants.
	 * Used to allow users to make selections from a range of values.
	 */
	export const slider = tv({
		slots: {
			root: "isolate touch-none flex relative leading-normal antialiased",
			control:
				"items-center w-full inline-flex touch-none select-none relative",
			track: "flex-1 overflow-hidden rounded-full relative",
			range: "w-[inherit] h-[inherit] absolute bg-(--c-solid)",
			thumb: [
				"z-2",
				"outline-0",
				"justify-center",
				"items-center",
				"flex",
				"[translate:0_-50%]",
				"rounded-full",
				"top-1/2",
				"absolute",
				"-translate-x-1/2",
				"focus-visible:ring-2",
				"focus-visible:ring-(--c-focus-ring)",
				"focus-visible:ring-offset-2",
				"focus-visible:ring-offset-bg-default",
				"transition-shadow",
			],
			label: "font-medium select-none",
			valueText: "text-fg-muted tabular-nums",
			markerGroup:
				"z-1 [position:absolute!important] overflow-visible select-none pointer-events-none h-0",
			marker: "flex-col items-center gap-1.5 text-xs flex pointer-events-none absolute [translate:-50%_0%]",
			markerDot: "rounded-full",
		},
		variants: {
			/**
			 * The size of the slider.
			 * @default "md"
			 */
			size: {
				sm: {
					root: "text-xs flex-col gap-1",
					control: "min-h-4",
					track: "h-1.5",
					thumb: "w-4 h-4",
					label: "text-xs",
					valueText: "text-xs",
					markerGroup: "start-[3px] end-[3px] top-1.5",
					marker: "w-1 h-1",
					markerDot: "w-1 h-1",
				},
				md: {
					root: "text-sm flex-col gap-1",
					control: "min-h-5",
					track: "h-2",
					thumb: "w-5 h-5",
					label: "text-sm",
					valueText: "text-sm",
					markerGroup: "start-1 end-1 top-2",
					marker: "w-1 h-1",
					markerDot: "w-1 h-1",
				},
				lg: {
					root: "text-sm flex-col gap-1",
					control: "min-h-6",
					track: "h-2.5",
					thumb: "w-6 h-6",
					label: "text-sm",
					valueText: "text-sm",
					markerGroup: "start-[5px] end-[5px] top-[9px]",
					marker: "w-1.5 h-1.5",
					markerDot: "w-1.5 h-1.5",
				},
			},
			/**
			 * The visual variant of the slider.
			 * @default "outline"
			 */
			variant: {
				outline: {
					track: "shadow-inner bg-[color-mix(in_oklch,var(--color-bg-subtle)_72%,transparent)]",
					thumb: "border-2 border-(--c-solid) bg-bg-default",
				},
				solid: {
					track: "bg-bg-muted",
					thumb: "bg-(--c-solid)",
				},
			},
			/**
			 * The orientation of the slider.
			 * @default "horizontal"
			 */
			orientation: {
				horizontal: {
					root: "flex-col",
					control: "flex-row",
				},
				vertical: {
					root: "flex-row h-full",
					control: "flex-col h-full w-auto",
					track: "h-full w-2",
					markerGroup: "top-0 bottom-0 inset-x-auto",
				},
			},
			/**
			 * Whether the slider is disabled.
			 * @default false
			 */
			disabled: {
				true: {
					root: "opacity-50 cursor-not-allowed",
					thumb: "bg-border-emphasized border-border-emphasized cursor-not-allowed",
					range: "bg-border-emphasized",
				},
			},
		},
		defaultVariants: {
			size: "md",
			variant: "outline",
			orientation: "horizontal",
		},
	});

	export type SliderVariants = VariantProps<typeof slider>;

	export interface SliderContext {
		styles: ReturnType<typeof slider>;
		disabled: boolean;
	}
</script>

<script lang="ts">
	import { Slider } from "@ark-ui/svelte/slider";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props {
		/**
		 * Content to render inside the slider (composition API).
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the slider.
		 * @default "md"
		 */
		size?: SliderVariants["size"];
		/**
		 * The visual variant of the slider.
		 * @default "outline"
		 */
		variant?: SliderVariants["variant"];
		/**
		 * The orientation of the slider.
		 * @default "horizontal"
		 */
		orientation?: SliderVariants["orientation"];
		/**
		 * The colour palette.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the slider is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * The controlled value of the slider.
		 */
		value?: number[];
		/**
		 * The initial value of the slider.
		 */
		defaultValue?: number[];
		/**
		 * The minimum value of the slider.
		 * @default 0
		 */
		min?: number;
		/**
		 * The maximum value of the slider.
		 * @default 100
		 */
		max?: number;
		/**
		 * The step value of the slider.
		 * @default 1
		 */
		step?: number;
		/**
		 * The name for the hidden input.
		 */
		name?: string;
		/**
		 * Function invoked when the value changes.
		 */
		onValueChange?: (details: { value: number[] }) => void;
		/**
		 * Function invoked when the value change ends.
		 */
		onValueChangeEnd?: (details: { value: number[] }) => void;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		size = "md",
		variant = "outline",
		orientation = "horizontal",
		colour = "gray",
		disabled = false,
		value = $bindable(),
		defaultValue,
		min = 0,
		max = 100,
		step = 1,
		name,
		onValueChange,
		onValueChangeEnd,
		...restProps
	}: Props = $props();

	const classes = $derived(slider({ size, variant, orientation, disabled }));
	const colourStyle = $derived(getColourStyle(colour));

	setContext<SliderContext>(SLIDER_CTX, {
		get styles() {
			return classes;
		},
		get disabled() {
			return disabled;
		},
	});
</script>

<Slider.Root
	thumbAlignment="center"
	{value}
	{defaultValue}
	{min}
	{max}
	{step}
	{name}
	{disabled}
	{orientation}
	{onValueChange}
	{onValueChangeEnd}
	class={twMerge(classes.root(), className)}
	style={colourStyle}
	{...restProps}
>
	{#if children}
		{@render children()}
	{/if}
</Slider.Root>
