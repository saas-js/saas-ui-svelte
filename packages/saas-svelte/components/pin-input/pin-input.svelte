<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	export const pinInputRoot = tv({
		base: ["z-0", "isolate", "relative"],
	});

	export const pinInputControl = tv({
		base: [
			"isolate",
			"inline-flex",
			"relative",
			"justify-start",
			"items-center",
		],
		variants: {
			attached: {
				true: "gap-0",
				false: "gap-2",
			},
		},
		defaultVariants: {
			attached: false,
		},
	});

	export const pinInputInput = tv({
		base: [
			"appearance-none",
			"text-center",
			"outline-0",
			"relative",
			"antialiased",
			"text-fg-default",
			"placeholder:text-fg-subtle",
			"placeholder:text-[0.6em]",
			"disabled:opacity-50",
			"disabled:cursor-not-allowed",
			"focus-visible:outline-solid",
			"focus-visible:outline-(--c-focus-ring)",
			"focus-visible:border-(--c-focus-ring)",
			"focus-visible:z-1",
		],
		variants: {
			variant: {
				outline: [
					"border",
					"rounded",
					"bg-transparent",
					"border-border-default",
					"hover:border-border-emphasized",
					"hover:focus-visible:border-(--c-focus-ring)",
				],
				subtle: [
					"border",
					"rounded",
					"bg-bg-subtle",
					"border-transparent",
				],
				flushed: [
					"rounded-none",
					"border-t-0",
					"border-x-0",
					"border-b",
					"bg-transparent",
					"border-b-border-default",
					"focus-visible:shadow",
					"focus-visible:border-(--c-focus-ring)",
				],
			},
			size: {
				xs: "w-6 min-w-6 h-6 text-xs leading-4",
				sm: "w-7 min-w-7 h-7 text-sm leading-5",
				md: "w-8 min-w-8 h-8 text-sm leading-5",
				lg: "w-10 min-w-10 h-10 text-sm leading-5 rounded-md",
			},
			attached: {
				true: [
					"rounded-none",
					"first:rounded-s",
					"last:rounded-e",
					"-ms-px",
					"first:ms-0",
				],
				false: "",
			},
			invalid: {
				true: [
					"border-border-error!",
					"focus-visible:border-border-error!",
					"focus-visible:outline-border-error!",
				],
			},
		},
		compoundVariants: [
			{
				attached: true,
				size: "lg",
				class: "first:rounded-s-md last:rounded-e-md",
			},
		],
		defaultVariants: {
			variant: "outline",
			size: "md",
			attached: false,
		},
	});

	export type PinInputVariants = VariantProps<typeof pinInputInput>;
</script>

<script lang="ts">
	import { PinInput } from "@ark-ui/svelte/pin-input";
	import type { ClassNameValue } from "tailwind-merge";
	import { getContext } from "svelte";
	import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";

	interface Props {
		/**
		 * The visual style of the pin input.
		 * @default "outline"
		 */
		variant?: PinInputVariants["variant"];
		/**
		 * The size of the pin input.
		 * @default "md"
		 */
		size?: PinInputVariants["size"];
		/**
		 * The colour theme of the pin input.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the pin input is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the pin input is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * The placeholder text for each input.
		 * @default "○"
		 */
		placeholder?: string;
		/**
		 * The current value of the pin input.
		 */
		value?: string[];
		/**
		 * The default value of the pin input.
		 */
		defaultValue?: string[];
		/**
		 * Callback when the value changes.
		 */
		onValueChange?: (details: {
			value: string[];
			valueAsString: string;
		}) => void;
		/**
		 * Callback when all inputs have valid values.
		 */
		onValueComplete?: (details: {
			value: string[];
			valueAsString: string;
		}) => void;
		/**
		 * Callback when an invalid value is entered.
		 */
		onValueInvalid?: (details: { value: string; index: number }) => void;
		/**
		 * The number of pin inputs to render.
		 * @default 4
		 */
		count?: number;
		/**
		 * The type of value the pin input should allow.
		 * @default "numeric"
		 */
		type?: "numeric" | "alphabetic" | "alphanumeric";
		/**
		 * Whether the pin input is one-time code (OTP) mode.
		 * @default false
		 */
		otp?: boolean;
		/**
		 * Whether to mask the input value (like password).
		 * @default false
		 */
		mask?: boolean;
		/**
		 * Whether the inputs are visually attached to each other.
		 * @default false
		 */
		attached?: boolean;
		/**
		 * Whether to auto-focus the first input.
		 * @default false
		 */
		autoFocus?: boolean;
		/**
		 * Whether to blur on complete.
		 * @default false
		 */
		blurOnComplete?: boolean;
		/**
		 * Whether to select input value on focus.
		 * @default true
		 */
		selectOnFocus?: boolean;
		/**
		 * The name attribute for form submission.
		 */
		name?: string;
		/**
		 * Whether the pin input is required.
		 * @default false
		 */
		required?: boolean;
		/**
		 * Whether the pin input is read-only.
		 * @default false
		 */
		readOnly?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
		/**
		 * Inline styles.
		 */
		style?: string;
		/**
		 * The id of the pin input.
		 */
		id?: string;
		/**
		 * Accessible label for the pin input group.
		 */
		"aria-label"?: string;
	}

	let {
		variant = "outline",
		size = "md",
		colour = "gray",
		invalid = false,
		disabled = false,
		placeholder = "○",
		value = $bindable(),
		defaultValue,
		onValueChange,
		onValueComplete,
		onValueInvalid,
		count = 4,
		type = "numeric",
		otp = false,
		mask = false,
		attached = false,
		autoFocus = false,
		blurOnComplete = false,
		selectOnFocus = true,
		name,
		required = false,
		readOnly = false,
		class: className,
		style,
		id,
		"aria-label": ariaLabel,
	}: Props = $props();

	const fieldContext = getContext<FieldContext>(FIELD_CTX);
	const fieldState = $derived($fieldContext ?? {});

	const colourVars = $derived(getColourStyle(colour));

	const isInvalid = $derived(invalid || fieldState.invalid || false);
	const isDisabled = $derived(disabled || fieldState.disabled || false);
	const isRequired = $derived(required || fieldState.required || false);
	const isReadOnly = $derived(readOnly || fieldState.readOnly || false);
	const inputId = $derived(id || fieldState.id);

	const rootClasses = $derived(pinInputRoot({ class: className }) as string);

	const controlClasses = $derived(
		pinInputControl({
			attached,
		}) as string,
	);

	const inputClasses = $derived(
		pinInputInput({
			variant,
			size,
			attached,
			invalid: isInvalid,
		}) as string,
	);

	const styles = $derived([colourVars, style].filter(Boolean).join("; "));

	// Generate array of indices for rendering inputs
	const inputIndices = $derived(Array.from({ length: count }, (_, i) => i));
</script>

<PinInput.Root
	class={rootClasses}
	style={styles}
	{id}
	{value}
	{defaultValue}
	{onValueChange}
	{onValueComplete}
	{onValueInvalid}
	{placeholder}
	{type}
	{otp}
	{mask}
	{autoFocus}
	{blurOnComplete}
	{selectOnFocus}
	{name}
	disabled={isDisabled}
	readOnly={isReadOnly}
	invalid={isInvalid}
	aria-label={ariaLabel}
>
	<PinInput.HiddenInput id={inputId} required={isRequired} />
	<PinInput.Control class={controlClasses}>
		{#each inputIndices as index (index)}
			<PinInput.Input {index} class={inputClasses} />
		{/each}
	</PinInput.Control>
</PinInput.Root>
