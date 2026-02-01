<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	export const textarea = tv({
		base: [
			// Core Layout
			"appearance-none",
			"outline-0",
			"w-full",
			"relative",
			"rounded",
			"border",
			// Text & Placeholder
			"antialiased",
			"placeholder:text-fg-muted",
			"placeholder:select-none",
			// Disabled
			"disabled:opacity-50",
			"disabled:cursor-not-allowed",
			// Focus - uses colour focus ring
			"focus-visible:outline-solid",
			"focus-visible:outline-(--c-focus-ring)",
			"focus-visible:border-(--c-focus-ring)",
		],
		variants: {
			variant: {
				outline: [
					"bg-transparent",
					"border-border-default",
					"enabled:hover:border-border-emphasized",
					"enabled:hover:focus-visible:border-(--c-focus-ring)",
				],
				subtle: ["border-transparent", "bg-bg-subtle"],
				flushed: [
					"rounded-none",
					"border-t-0",
					"border-x-0",
					"border-b",
					"bg-transparent",
					"shadow-none",
					"px-0",
					"border-border-default",
					"focus-visible:outline-0",
					"focus-visible:shadow",
					"focus-visible:border-(--c-focus-ring)",
				],
			},
			size: {
				xs: "px-2 py-1 text-xs leading-xs scroll-pb-1",
				sm: "px-2.5 py-1.5 text-sm leading-sm scroll-pb-1.5",
				md: "px-3 py-1.5 text-sm leading-sm scroll-pb-1.5",
				lg: "px-4 py-2 text-sm leading-sm scroll-pb-2 rounded-md",
				xl: "px-5 py-3.5 text-sm leading-sm scroll-pb-3.5 rounded-md",
			},
			invalid: {
				true: [
					"border-border-error",
					"focus-visible:border-border-error",
					"focus-visible:outline-border-error",
					"enabled:hover:border-border-emphasized",
				],
			},
			resize: {
				none: "resize-none",
				vertical: "resize-y",
				horizontal: "resize-x",
				both: "resize",
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type TextareaVariants = VariantProps<typeof textarea>;
</script>

<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import { twMerge, type ClassNameValue } from "tailwind-merge";
	import { getContext } from "svelte";
	import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";

	interface Props extends Omit<HTMLTextareaAttributes, "class"> {
		/**
		 * The visual style of the textarea.
		 * @default "outline"
		 */
		variant?: TextareaVariants["variant"];
		/**
		 * The size of the textarea.
		 * @default "md"
		 */
		size?: TextareaVariants["size"];
		/**
		 * The colour theme of the textarea.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the textarea is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the textarea is disabled.
		 */
		disabled?: boolean;
		/**
		 * Placeholder text for the textarea.
		 */
		placeholder?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
		/**
		 * The resize behavior of the textarea.
		 */
		resize?: "none" | "vertical" | "horizontal" | "both";
	}

	let {
		variant = "outline",
		size = "md",
		colour = "gray",
		class: className,
		invalid = false,
		disabled = false,
		value = $bindable(),
		resize,
		style,
		...restProps
	}: Props = $props();

	const fieldContext = getContext<FieldContext>(FIELD_CTX);

	const fieldState = $derived($fieldContext ?? {});

	const colourVars = $derived(getColourStyle(colour));

	const isInvalid = $derived(invalid || fieldState.invalid || false);
	const isDisabled = $derived(disabled || fieldState.disabled || false);
	const isRequired = $derived(
		restProps.required || fieldState.required || false,
	);
	const isReadOnly = $derived(
		restProps.readonly || fieldState.readOnly || false,
	);
	const id = $derived(restProps.id || fieldState.id);

	const classes = $derived(
		textarea({
			variant,
			size,
			invalid: isInvalid,
			resize,
			class: className,
		}),
	);

	const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<textarea
	{id}
	disabled={isDisabled}
	required={isRequired}
	readonly={isReadOnly}
	class={classes}
	style={styles}
	bind:value
	{...restProps}
></textarea>
