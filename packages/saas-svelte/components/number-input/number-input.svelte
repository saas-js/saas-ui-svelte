<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import { getColourStyle, type ColourName } from "$saas/utils/colours";

export const numberInputRoot = tv({
	base: ["z-0", "isolate", "relative", "w-full"],
});

export const numberInputControl = tv({
	base: [
		"isolate",
		"gap-2",
		"inline-flex",
		"relative",
		"justify-start",
		"items-center",
		"w-full",
	],
});

export const numberInputInput = tv({
	base: [
		"appearance-none",
		"align-top",
		"w-full",
		"outline-0",
		"relative",
		"rounded",
		"border",
		"antialiased",
		"border-border-default",
		"hover:border-border-emphasized",
		"hover:focus-visible:border-(--c-focus-ring)",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
		"focus-visible:outline-solid",
		"focus-visible:outline-(--c-focus-ring)",
		"focus-visible:border-(--c-focus-ring)",
	],
	variants: {
		size: {
			xs: "min-w-6 h-6 px-2 text-xs leading-4",
			sm: "min-w-7 h-7 px-2.5 text-sm leading-5",
			md: "min-w-8 h-8 px-3 text-sm leading-5",
			lg: "min-w-10 h-10 px-5 text-sm leading-5 rounded-md",
		},
		invalid: {
			true: [
				"border-border-error!",
				"focus-visible:border-border-error!",
				"focus-visible:outline-border-error!",
			],
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const numberInputTriggerGroup = tv({
	base: [
		"z-1",
		"flex-col",
		"h-[calc(100%-2px)]",
		"flex",
		"absolute",
		"end-0",
		"m-px",
		"border-l",
		"border-border-default",
		"top-0",
	],
	variants: {
		size: {
			xs: "w-4 text-xs",
			sm: "w-5 text-xs",
			md: "w-6 text-sm",
			lg: "w-6 text-sm",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const numberInputTrigger = tv({
	base: [
		"appearance-auto",
		"select-none",
		"cursor-pointer",
		"text-fg-muted",
		"flex-1",
		"justify-center",
		"items-center",
		"leading-none",
		"flex",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
		"data-disabled:opacity-50",
		"data-disabled:cursor-not-allowed",
		"hover:not-data-disabled:bg-bg-subtle",
		"active:not-data-disabled:bg-bg-muted",
		"[&_svg]:size-3.5",
	],
	variants: {
		size: {
			xs: "[&_svg]:size-2.5",
			sm: "[&_svg]:size-3",
			md: "",
			lg: "",
		},
		position: {
			increment: "rounded-se-[calc(.2rem+1px)]",
			decrement:
				"rounded-ee-[calc(.2rem+1px)] border-t border-t-border-default border-b-0",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type NumberInputVariants = VariantProps<typeof numberInputInput>;
</script>

<script lang="ts">
import { NumberInput } from "@ark-ui/svelte/number-input";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import { getContext } from "svelte";
import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";
import { Flex } from "$saas/layout/flex";

interface Props {
	/**
	 * The size of the number input.
	 * @default "md"
	 */
	size?: NumberInputVariants["size"];
	/**
	 * The colour theme of the number input.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether the number input is in an invalid state.
	 * @default false
	 */
	invalid?: boolean;
	/**
	 * Whether the number input is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Placeholder text for the input.
	 */
	placeholder?: string;
	/**
	 * The current value of the number input.
	 */
	value?: string;
	/**
	 * The default value of the number input.
	 */
	defaultValue?: string;
	/**
	 * Callback when the value changes.
	 */
	onValueChange?: (details: { value: string; valueAsNumber: number }) => void;
	/**
	 * The minimum value allowed.
	 */
	min?: number;
	/**
	 * The maximum value allowed.
	 */
	max?: number;
	/**
	 * The step increment/decrement value.
	 * @default 1
	 */
	step?: number;
	/**
	 * Whether to allow mouse wheel to change the value.
	 * @default false
	 */
	allowMouseWheel?: boolean;
	/**
	 * Whether to clamp the value when the input loses focus.
	 * @default true
	 */
	clampValueOnBlur?: boolean;
	/**
	 * Whether to allow the value to overflow the min/max range.
	 * @default false
	 */
	allowOverflow?: boolean;
	/**
	 * Whether to spin the value when the increment/decrement button is pressed.
	 * @default true
	 */
	spinOnPress?: boolean;
	/**
	 * The input mode for the input element.
	 * @default "decimal"
	 */
	inputMode?: "text" | "decimal" | "numeric";
	/**
	 * The locale for formatting.
	 * @default "en-US"
	 */
	locale?: string;
	/**
	 * Format options for Intl.NumberFormat.
	 */
	formatOptions?: Intl.NumberFormatOptions;
	/**
	 * The name attribute for form submission.
	 */
	name?: string;
	/**
	 * Whether the input is required.
	 * @default false
	 */
	required?: boolean;
	/**
	 * Whether the input is read-only.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Accessible label for the input (for screen readers).
	 */
	"aria-label"?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: ClassNameValue;
	/**
	 * Inline styles.
	 */
	style?: string;
	/**
	 * The id of the input element.
	 */
	id?: string;
}

let {
	size = "md",
	colour = "gray",
	invalid = false,
	disabled = false,
	placeholder,
	value = $bindable(),
	defaultValue,
	onValueChange,
	min,
	max,
	step = 1,
	allowMouseWheel = false,
	clampValueOnBlur = true,
	allowOverflow = false,
	spinOnPress = true,
	inputMode = "decimal",
	locale = "en-US",
	formatOptions,
	name,
	required = false,
	readOnly = false,
	"aria-label": ariaLabel,
	class: className,
	style,
	id,
}: Props = $props();

const fieldContext = getContext<FieldContext>(FIELD_CTX);
const fieldState = $derived($fieldContext ?? {});

const colourVars = $derived(getColourStyle(colour));

const isInvalid = $derived(invalid || fieldState.invalid || false);
const isDisabled = $derived(disabled || fieldState.disabled || false);
const isRequired = $derived(required || fieldState.required || false);
const isReadOnly = $derived(readOnly || fieldState.readOnly || false);
const inputId = $derived(id || fieldState.id);

const rootClasses = $derived(twMerge(numberInputRoot(), className as string));

const inputClasses = $derived(
	numberInputInput({
		size,
		invalid: isInvalid,
	}) as string,
);

const triggerGroupClasses = $derived(
	numberInputTriggerGroup({
		size,
	}) as string,
);

const incrementClasses = $derived(
	numberInputTrigger({
		size,
		position: "increment",
	}) as string,
);

const decrementClasses = $derived(
	numberInputTrigger({
		size,
		position: "decrement",
	}) as string,
);

const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<NumberInput.Root
	class={rootClasses}
	style={styles}
	id={inputId}
	value={value}
	defaultValue={defaultValue}
	onValueChange={onValueChange}
	min={min}
	max={max}
	step={step}
	allowMouseWheel={allowMouseWheel}
	clampValueOnBlur={clampValueOnBlur}
	allowOverflow={allowOverflow}
	spinOnPress={spinOnPress}
	inputMode={inputMode}
	locale={locale}
	formatOptions={formatOptions}
	name={name}
	disabled={isDisabled}
	readOnly={isReadOnly}
	invalid={isInvalid}
>
	<NumberInput.Control class={numberInputControl()}>
		<NumberInput.Input
			class={inputClasses}
			placeholder={placeholder}
			required={isRequired}
			aria-label={ariaLabel}
		/>
	</NumberInput.Control>
	<Flex direction="column" class={triggerGroupClasses} role="group" aria-disabled={isDisabled}>
		<NumberInput.IncrementTrigger class={incrementClasses} aria-label="Increment">
			<svg
				viewBox="0 0 24 24"
				class="fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
				aria-hidden="true"
			>
				<path d="m18 15-6-6-6 6"></path>
			</svg>
		</NumberInput.IncrementTrigger>
		<NumberInput.DecrementTrigger class={decrementClasses} aria-label="Decrement">
			<svg
				viewBox="0 0 24 24"
				class="fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
				aria-hidden="true"
			>
				<path d="m6 9 6 6 6-6"></path>
			</svg>
		</NumberInput.DecrementTrigger>
	</Flex>
</NumberInput.Root>
