<script lang="ts">
	import type { Snippet } from "svelte";
	import { Switch } from "@ark-ui/svelte/switch";
	import { tv, type VariantProps } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	const switchRecipe = tv({
		slots: {
			root: "items-center gap-2.5 inline-flex relative align-middle antialiased",
			control:
				"shrink-0 justify-start gap-2 inline-flex relative rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150",
			thumb: "shrink-0 justify-center items-center flex rounded-[inherit] transition-transform duration-150",
			label: "select-none font-medium leading-none",
		},
		variants: {
			/**
			 * The size of the switch.
			 * @default "md"
			 */
			size: {
				xs: {
					control: "w-6 h-3",
					thumb: "w-3 h-3",
					label: "text-xs",
				},
				sm: {
					control: "w-8 h-4",
					thumb: "w-4 h-4",
					label: "text-xs",
				},
				md: {
					control: "w-10 h-5",
					thumb: "w-5 h-5",
					label: "text-sm",
				},
				lg: {
					control: "w-12 h-6",
					thumb: "w-6 h-6",
					label: "text-sm",
				},
			},
			/**
			 * The visual variant of the switch.
			 * @default "solid"
			 */
			variant: {
				solid: {
					thumb: "shadow scale-[0.8] bg-white",
				},
				raised: {
					control: "shadow-inner",
					thumb: "shadow-sm relative",
				},
			},
		},
		compoundVariants: [
			// Raised variant track heights (thinner)
			{
				variant: "raised",
				size: "xs",
				class: {
					control: "h-1.5",
					thumb: "-top-0.75",
				},
			},
			{
				variant: "raised",
				size: "sm",
				class: {
					control: "h-2",
					thumb: "top-[-0.25rem]",
				},
			},
			{
				variant: "raised",
				size: "md",
				class: {
					control: "h-2.5",
					thumb: "-top-1.25",
				},
			},
			{
				variant: "raised",
				size: "lg",
				class: {
					control: "h-3",
					thumb: "top-[-0.375rem]",
				},
			},
		],
		defaultVariants: {
			size: "md",
			variant: "solid",
		},
	});

	type SwitchVariants = VariantProps<typeof switchRecipe>;

	interface ThumbLabel {
		on?: Snippet;
		off?: Snippet;
	}

	interface TrackLabel {
		on?: Snippet;
		off?: Snippet;
	}

	interface Props {
		/**
		 * The label content of the switch.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the switch.
		 * @default "md"
		 */
		size?: SwitchVariants["size"];
		/**
		 * The visual variant of the switch.
		 * @default "solid"
		 */
		variant?: SwitchVariants["variant"];
		/**
		 * The colour palette to use.
		 * @default "accent"
		 */
		colour?: ColourName;
		/**
		 * Whether the switch is checked.
		 */
		checked?: boolean;
		/**
		 * Whether the switch is disabled.
		 */
		disabled?: boolean;
		/**
		 * Whether the switch is invalid.
		 */
		invalid?: boolean;
		/**
		 * The name of the switch for form submission.
		 */
		name?: string;
		/**
		 * The value of the switch for form submission.
		 */
		value?: string;
		/**
		 * Callback when the checked state changes.
		 */
		onCheckedChange?: (details: { checked: boolean }) => void;
		/**
		 * Labels to display on the thumb based on state.
		 */
		thumbLabel?: ThumbLabel;
		/**
		 * Labels to display on the track based on state.
		 */
		trackLabel?: TrackLabel;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		size = "md",
		variant = "solid",
		colour = "accent",
		checked = $bindable(false),
		disabled = false,
		invalid = false,
		name,
		value = "on",
		onCheckedChange,
		thumbLabel,
		trackLabel,
		...restProps
	}: Props = $props();

	const styles = $derived(switchRecipe({ size, variant }));
	const colourStyle = $derived(getColourStyle(colour));

	// Calculate translate distance based on size
	const translateMap = {
		xs: "0.75rem",
		sm: "1rem",
		md: "1.25rem",
		lg: "1.5rem",
	};
	const translateDistance = $derived(translateMap[size ?? "md"]);

	function handleCheckedChange(details: { checked: boolean }) {
		checked = details.checked;
		onCheckedChange?.(details);
	}
</script>

<Switch.Root
	class={twMerge(styles.root(), className)}
	style={colourStyle}
	{checked}
	{disabled}
	{invalid}
	{name}
	{value}
	onCheckedChange={handleCheckedChange}
	{...restProps}
>
	<Switch.HiddenInput />
	<Switch.Control
		class={twMerge(
			styles.control(),
			"bg-bg-emphasized",
			// Solid variant: solid accent when checked
			variant === "solid" && "data-[state=checked]:bg-(--c-solid)",
			// Raised variant: semi-transparent accent when checked
			variant === "raised" && "data-[state=checked]:bg-(--c-solid)/60",
			"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring)",
			disabled && "opacity-50 cursor-not-allowed",
		)}
	>
		<Switch.Thumb
			class={twMerge(
				styles.thumb(),
				variant === "raised" && "bg-(--c-solid)",
				variant === "raised" &&
					"focus-visible:outline-offset-2 focus-visible:outline-1 focus-visible:outline-solid focus-visible:outline-(--c-focus-ring)",
			)}
			style="translate: {checked ? translateDistance : '0'};"
		>
			{#if thumbLabel}
				{#if checked && thumbLabel.on}
					{#if typeof thumbLabel.on === "function"}
						{@render thumbLabel.on()}
					{/if}
				{:else if !checked && thumbLabel.off}
					{#if typeof thumbLabel.off === "function"}
						{@render thumbLabel.off()}
					{/if}
				{/if}
			{/if}
		</Switch.Thumb>
		{#if trackLabel}
			<span
				class="select-none shrink-0 content-center justify-center text-sm font-medium transition-[inset-inline-start] duration-100 grid absolute"
				style="width: {translateDistance}; height: {translateDistance}; inset-inline-start: {checked
					? '2px'
					: `calc(${translateDistance} - 2px)`};"
			>
				{#if checked && trackLabel.on}
					{#if typeof trackLabel.on === "function"}
						{@render trackLabel.on()}
					{/if}
				{:else if !checked && trackLabel.off}
					{#if typeof trackLabel.off === "function"}
						{@render trackLabel.off()}
					{/if}
				{/if}
			</span>
		{/if}
	</Switch.Control>
	{#if children}
		<Switch.Label class={twMerge(styles.label(), disabled && "opacity-50")}>
			{@render children()}
		</Switch.Label>
	{/if}
</Switch.Root>
