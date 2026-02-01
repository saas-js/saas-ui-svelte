<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const RADIO_GROUP_CTX = Symbol("RADIO_GROUP_CTX");

	export const radioGroup = tv({
		slots: {
			root: "relative flex flex-col gap-y-1.5 antialiased",
			item: "align-top items-center gap-x-2.5 inline-flex relative group",
			control: [
				"shrink-0",
				"justify-center",
				"items-center",
				"inline-flex",
				"rounded-full",
				"border",
			],
			indicator: "bg-current size-full rounded-full",
			label: "select-none font-medium leading-5",
		},
		variants: {
			size: {
				sm: {
					control: "size-3.5",
					label: "text-sm",
				},
				md: {
					control: "size-4",
					label: "text-sm",
				},
				lg: {
					control: "size-5",
					label: "text-sm",
				},
			},
			variant: {
				solid: {},
				subtle: {},
				outline: {},
			},
			orientation: {
				horizontal: {},
				vertical: {},
			},
			disabled: {
				true: {
					item: "opacity-50 cursor-not-allowed",
				},
			},
			invalid: {
				true: {},
				false: {},
			},
		},
		compoundVariants: [
			// Valid states - colour-based focus ring
			{
				variant: "solid",
				invalid: false,
				class: {
					control:
						"text-white border-border-emphasized focus:outline-1 focus:outline-offset-2 focus:outline-(--c-focus-ring) focus:outline-solid data-[state=checked]:bg-(--c-solid) data-[state=checked]:border-(--c-solid)",
				},
			},
			{
				variant: "subtle",
				invalid: false,
				class: {
					control:
						"text-transparent border-border-emphasized focus:outline-1 focus:outline-offset-2 focus:outline-(--c-focus-ring) focus:outline-solid data-[state=checked]:bg-(--c-subtle) data-[state=checked]:border-(--c-subtle) data-[state=checked]:text-(--c-fg)",
				},
			},
			{
				variant: "outline",
				invalid: false,
				class: {
					control:
						"text-white border-border-emphasized focus:outline-1 focus:outline-offset-2 focus:outline-(--c-focus-ring) focus:outline-solid data-[state=checked]:border-(--c-solid) data-[state=checked]:text-(--c-fg)",
				},
			},
			// Invalid states - error focus ring
			{
				variant: "solid",
				invalid: true,
				class: {
					control:
						"text-white border-border-error focus:outline-1 focus:outline-offset-2 focus:outline-border-error focus:outline-solid data-[state=checked]:bg-border-error data-[state=checked]:border-border-error",
				},
			},
			{
				variant: "subtle",
				invalid: true,
				class: {
					control:
						"text-transparent border-border-error focus:outline-1 focus:outline-offset-2 focus:outline-border-error focus:outline-solid data-[state=checked]:bg-border-error data-[state=checked]:border-border-error data-[state=checked]:text-fg-inverted",
				},
			},
			{
				variant: "outline",
				invalid: true,
				class: {
					control:
						"text-white border-border-error focus:outline-1 focus:outline-offset-2 focus:outline-border-error focus:outline-solid data-[state=checked]:border-border-error data-[state=checked]:text-border-error",
				},
			},
		],
		defaultVariants: {
			size: "md",
			variant: "solid",
			orientation: "vertical",
			invalid: false,
		},
	});

	export type RadioGroupVariants = VariantProps<typeof radioGroup>;

	export interface RadioGroupContext {
		styles: ReturnType<typeof radioGroup>;
		variant: RadioGroupVariants["variant"];
		colour: string;
		disabled: boolean;
	}
</script>

<script lang="ts">
	import { RadioGroup } from "@ark-ui/svelte/radio-group";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import { setContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * Content to render inside the radio group.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * The size of the radio buttons.
		 * @default "md"
		 */
		size?: RadioGroupVariants["size"];
		/**
		 * The visual style of the radio buttons.
		 * @default "solid"
		 */
		variant?: RadioGroupVariants["variant"];
		/**
		 * The colour palette of the radio buttons.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * The controlled value of the radio group.
		 */
		value?: string;
		/**
		 * The default value when uncontrolled.
		 */
		defaultValue?: string;
		/**
		 * The name of the input fields (used for form submission).
		 */
		name?: string;
		/**
		 * Layout orientation of the radio group.
		 * @default "vertical"
		 */
		orientation?: RadioGroupVariants["orientation"];
		/**
		 * Whether the radio group is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Whether the radio group is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the radio group is read-only.
		 * @default false
		 */
		readOnly?: boolean;
		/**
		 * Callback invoked when the value changes.
		 */
		onValueChange?: (details: { value: string | null }) => void;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		size = "md",
		variant = "solid",
		colour = "indigo",
		value = $bindable(),
		defaultValue,
		name,
		orientation = "vertical",
		disabled = false,
		invalid = false,
		readOnly = false,
		onValueChange,
		...restProps
	}: Props = $props();

	const classes = $derived(
		radioGroup({ size, variant, orientation, disabled, invalid }),
	);
	const colourVars = $derived(getColourStyle(colour));

	setContext<RadioGroupContext>(RADIO_GROUP_CTX, {
		get styles() {
			return classes;
		},
		get variant() {
			return variant;
		},
		get colour() {
			return colour;
		},
		get disabled() {
			return disabled;
		},
	});

	function handleValueChange(details: { value: string | null }) {
		value = details.value ?? undefined;
		onValueChange?.(details);
	}
</script>

<RadioGroup.Root
	{value}
	{defaultValue}
	{name}
	{orientation}
	{disabled}
	{readOnly}
	onValueChange={handleValueChange}
	class={twMerge(classes.root(), className)}
	style={colourVars}
	{...restProps}
>
	{@render children?.()}
</RadioGroup.Root>
