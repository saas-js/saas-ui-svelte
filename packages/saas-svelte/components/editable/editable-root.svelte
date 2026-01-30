<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import type { ColourName } from "$saas/utils/colours";

/**
 * Tailwind Variants styles for the Editable root component.
 */
export const editableRoot = tv({
	base: [
		"relative",
		"inline-flex",
		"items-center",
		"gap-1.5",
		"antialiased",
		"has-data-focus:w-full",
	],
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			md: "text-sm",
			lg: "text-base",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type EditableRootVariants = VariantProps<typeof editableRoot>;

export const EDITABLE_CTX = Symbol("EDITABLE_CTX");
</script>

<script lang="ts">
import { Editable } from "@ark-ui/svelte/editable";
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { getColourStyle } from "$saas/utils/colours";

type ActivationMode = "focus" | "dblclick" | "click" | "none";
type SubmitMode = "enter" | "blur" | "none" | "both";

interface Props {
	/**
	 * The content to render inside the editable.
	 */
	children: Snippet;
	/**
	 * The activation mode for entering edit mode.
	 * @default "focus"
	 */
	activationMode?: ActivationMode;
	/**
	 * Whether to auto-resize the input to fit content.
	 * @default false
	 */
	autoResize?: boolean;
	/**
	 * The initial value when uncontrolled.
	 */
	defaultValue?: string;
	/**
	 * The controlled value.
	 */
	value?: string;
	/**
	 * Called when the value changes.
	 */
	onValueChange?: (details: { value: string }) => void;
	/**
	 * Called when the value is committed (submitted).
	 */
	onValueCommit?: (details: { value: string }) => void;
	/**
	 * Called when the value is reverted (cancelled).
	 */
	onValueRevert?: (details: { value: string }) => void;
	/**
	 * Called when edit mode changes.
	 */
	onEditChange?: (details: { edit: boolean }) => void;
	/**
	 * Placeholder text when empty.
	 */
	placeholder?: string | { edit: string; preview: string };
	/**
	 * Maximum number of characters allowed.
	 */
	maxLength?: number;
	/**
	 * Whether to select text on focus.
	 * @default true
	 */
	selectOnFocus?: boolean;
	/**
	 * How to submit the value.
	 * @default "both"
	 */
	submitMode?: SubmitMode;
	/**
	 * Whether the editable is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Whether the editable is read-only.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Whether the editable is required.
	 * @default false
	 */
	required?: boolean;
	/**
	 * Whether the editable is invalid.
	 * @default false
	 */
	invalid?: boolean;
	/**
	 * The size of the editable.
	 * @default "md"
	 */
	size?: EditableRootVariants["size"];
	/**
	 * The colour theme for focus states.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * Additional inline styles.
	 */
	style?: string;
	/**
	 * The name attribute for form submission.
	 */
	name?: string;
	/**
	 * The form ID for form association.
	 */
	form?: string;
	/**
	 * Additional props passed to Ark UI.
	 */
	[key: string]: any;
}

let {
	children,
	activationMode = "focus",
	autoResize = false,
	defaultValue,
	value = $bindable(),
	onValueChange,
	onValueCommit,
	onValueRevert,
	onEditChange,
	placeholder,
	maxLength,
	selectOnFocus = true,
	submitMode = "both",
	disabled = false,
	readOnly = false,
	required = false,
	invalid = false,
	size = "md",
	colour = "gray",
	class: className,
	style,
	name,
	form,
	...restProps
}: Props = $props();

const colourVars = $derived(getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

let contextState = $state<{
	size: EditableRootVariants["size"];
	colour: ColourName;
	invalid: boolean;
	disabled: boolean;
}>({
	size: "md",
	colour: "gray",
	invalid: false,
	disabled: false,
});

$effect(() => {
	contextState.size = size;
	contextState.colour = colour;
	contextState.invalid = invalid;
	contextState.disabled = disabled;
});

setContext(EDITABLE_CTX, contextState);
</script>

<Editable.Root
	activationMode={activationMode}
	autoResize={autoResize}
	defaultValue={defaultValue}
	bind:value={value}
	onValueChange={(e) => onValueChange?.(e)}
	onValueCommit={(e) => onValueCommit?.(e)}
	onValueRevert={(e) => onValueRevert?.(e)}
	onEditChange={(e) => onEditChange?.(e)}
	placeholder={placeholder}
	maxLength={maxLength}
	selectOnFocus={selectOnFocus}
	submitMode={submitMode}
	disabled={disabled}
	readOnly={readOnly}
	required={required}
	invalid={invalid}
	name={name}
	form={form}
	class={twMerge(editableRoot({ size }), className as string)}
	style={finalStyle}
	{...restProps}
>
	{@render children?.()}
</Editable.Root>
