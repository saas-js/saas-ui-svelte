<script lang="ts" module>
import { tv, type VariantProps } from "tailwind-variants";

export const CHECKBOX_CARD_CTX = Symbol("CHECKBOX_CARD_CTX");

export const checkboxCardRoot = tv({
	base: [
		"select-none",
		"antialiased",
		"flex-col flex-1 flex relative",
		"text-sm leading-sm",
		"rounded-md",
		"border",
		"has-focus-visible:outline-offset-2",
		"has-focus-visible:outline-1",
		"has-focus-visible:outline-solid",
		"has-focus-visible:outline-(--c-solid)",
	],
	variants: {
		variant: {
			subtle: "bg-bg-subtle border-transparent",
			surface: "border-border-default",
			outline: "border-border-default",
		},
		size: {
			sm: "",
			md: "",
			lg: "",
		},
		checked: {
			true: "",
			false: "",
		},
		disabled: {
			true: "opacity-80 border-border-muted",
			false: "",
		},
	},
	compoundVariants: [
		// Subtle - checked: darker colored background, no border effect
		{
			variant: "subtle",
			checked: true,
			class: "text-(--c-fg) bg-(--c-muted)",
		},
		// Surface - checked: lighter colored background + 2px border effect via inset shadow
		{
			variant: "surface",
			checked: true,
			class: "text-(--c-fg) bg-(--c-subtle) border-(--c-subtle) shadow-[inset_0_0_0_1px_var(--c-subtle)]",
		},
		// Outline - checked: colored border + 2px border effect via inset shadow
		{
			variant: "outline",
			checked: true,
			class: "border-(--c-solid) shadow-[inset_0_0_0_1px_var(--c-solid)]",
		},
		// Disabled states
		{
			disabled: true,
			variant: "outline",
			class: "border-border-muted",
		},
		{
			disabled: true,
			variant: "surface",
			class: "bg-bg-subtle border-border-muted",
		},
	],
	defaultVariants: {
		variant: "outline",
		size: "md",
		checked: false,
		disabled: false,
	},
});

export type CheckboxCardVariants = VariantProps<typeof checkboxCardRoot>;
</script>

<script lang="ts">
import type { HTMLLabelAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { setContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props extends Omit<HTMLLabelAttributes, "class"> {
	/**
	 * Accessible label for the checkbox input.
	 * Required for accessibility compliance.
	 */
	"aria-label": string;
	/**
	 * The controlled checked state of the checkbox card.
	 * @default false
	 */
	checked?: boolean;
	/**
	 * The value of the checkbox card.
	 */
	value?: string;
	/**
	 * The visual style variant.
	 * @default "outline"
	 */
	variant?: CheckboxCardVariants["variant"];
	/**
	 * The size of the checkbox card.
	 * @default "md"
	 */
	size?: CheckboxCardVariants["size"];
	/**
	 * The colour palette of the checkbox card.
	 * @default "indigo"
	 */
	colour?: ColourName;
	/**
	 * Whether the checkbox card is disabled.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * The content of the checkbox card.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Callback invoked when the checked state changes.
	 */
	onCheckedChange?: (details: { checked: boolean }) => void;
}

let {
	"aria-label": ariaLabel,
	checked = $bindable(false),
	value,
	variant = "outline",
	size = "md",
	colour = "indigo",
	disabled = false,
	children,
	class: className,
	onCheckedChange,
	...restProps
}: Props = $props();

const colourVars = $derived(getColourStyle(colour));

// Context state with getters for reactivity
const contextState = $state({
	get checked() {
		return checked;
	},
	get variant() {
		return variant;
	},
	get size() {
		return size;
	},
	get disabled() {
		return disabled;
	},
	get colour() {
		return colour;
	},
});

// Update context when props change
$effect(() => {
	contextState.checked;
	contextState.variant;
	contextState.size;
	contextState.disabled;
	contextState.colour;
});

setContext(CHECKBOX_CARD_CTX, contextState);

function handleChange(e: Event) {
	if (disabled) return;
	const target = e.currentTarget as HTMLInputElement;
	checked = target.checked;
	onCheckedChange?.({ checked: target.checked });
}

const finalClass = $derived(
	twMerge(
		checkboxCardRoot({
			variant,
			size,
			checked,
			disabled,
		}),
		className as string,
	),
);
</script>

<label class={finalClass} style={colourVars} {...restProps}>
	<input
		type="checkbox"
		class="peer sr-only"
		aria-label={ariaLabel}
		checked={checked}
		value={value}
		disabled={disabled}
		onchange={handleChange}
	/>
	{@render children()}
</label>
