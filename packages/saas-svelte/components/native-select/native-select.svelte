<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import { getColourStyle, type ColourName } from "$saas/utils/colours";

export const nativeSelect = tv({
	base: [
		"appearance-none",
		"outline-0",
		"w-full",
		"rounded",
		"border",
		"antialiased",
		"disabled:opacity-50",
		"disabled:cursor-not-allowed",
		"focus-visible:outline-solid",
		"focus-visible:outline-(--c-focus-ring)",
		"focus-visible:border-(--c-focus-ring)",
	],
	variants: {
		variant: {
			outline: ["border-border-default"],
			subtle: ["bg-bg-subtle", "border-transparent"],
			plain: ["rounded", "text-fg-default", "focus-visible:outline-2"],
		},
		size: {
			xs: "h-6 pl-2 pr-6 text-xs leading-4",
			sm: "h-8 pl-2.5 pr-8 text-sm leading-5",
			md: "h-10 pl-3 pr-8 text-sm leading-5",
			lg: "h-11 pl-4 pr-8 text-sm leading-5",
			xl: "h-12 pl-5 pr-10 text-sm leading-5",
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
		variant: "outline",
		size: "md",
	},
});

export type NativeSelectVariants = VariantProps<typeof nativeSelect>;
</script>

<script lang="ts">
import type { HTMLSelectAttributes } from "svelte/elements";
import { twMerge, type ClassNameValue } from "tailwind-merge";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";

interface Props extends Omit<HTMLSelectAttributes, "size" | "class"> {
	/**
	 * The visual style of the select.
	 * @default "outline"
	 */
	variant?: NativeSelectVariants["variant"];
	/**
	 * The size of the select.
	 * @default "md"
	 */
	size?: NativeSelectVariants["size"];
	/**
	 * The colour theme of the select.
	 * @default "gray"
	 */
	colour?: ColourName;
	/**
	 * Whether the select is in an invalid state.
	 * @default false
	 */
	invalid?: boolean;
	/**
	 * Whether the select is disabled.
	 */
	disabled?: boolean;
	/**
	 * The selected value.
	 */
	value?: any;
	/**
	 * Content to render inside the select (options).
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: ClassNameValue;
}

let {
	variant = "outline",
	size = "md",
	colour = "gray",
	class: className,
	invalid = false,
	disabled = false,
	value = $bindable(),
	children,
	style,
	...restProps
}: Props = $props();

const fieldContext = getContext<FieldContext>(FIELD_CTX);

const fieldState = $derived($fieldContext ?? {});

const colourVars = $derived(getColourStyle(colour));

const isInvalid = $derived(invalid || fieldState.invalid || false);
const isDisabled = $derived(disabled || fieldState.disabled || false);
const isRequired = $derived(restProps.required || fieldState.required || false);
const id = $derived(restProps.id || fieldState.id);

const classes = $derived(
	twMerge(
		nativeSelect({
			variant,
			size,
			invalid: isInvalid,
		}),
		className as string,
	),
);

const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<select
	id={id}
	disabled={isDisabled}
	required={isRequired}
	class={classes}
	style={styles}
	bind:value={value}
	{...restProps}
>
	{@render children?.()}
</select>
