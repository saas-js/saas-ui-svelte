<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";

	export const input = tv({
		base: [
			"appearance-none",
			"outline-0",
			"w-full",
			"relative",
			"rounded",
			"border",
			"antialiased",
			"placeholder:text-fg-muted",
			"placeholder:select-none",
			"disabled:opacity-50",
			"disabled:cursor-not-allowed",
			"focus-visible:outline-solid",
			"focus-visible:outline-(--c-focus-ring)",
			"focus-visible:border-(--c-focus-ring)",
		],
		variants: {
			variant: {
				outline: [
					"border-border-default",
					"hover:border-border-emphasized",
					"hover:focus-visible:border-(--c-focus-ring)",
				],
				subtle: ["bg-bg-subtle", "border-transparent"],
				flushed: [
					"rounded-none",
					"border-t-0",
					"border-x-0",
					"border-b",
					"border-b-border-default",
					"focus-visible:shadow",
					"focus-visible:border-(--c-focus-ring)",
				],
			},
			size: {
				xs: "min-w-6 h-6 px-2 text-xs leading-4",
				sm: "min-w-7 h-7 px-2.5 text-sm leading-5",
				md: "min-w-8 h-8 px-3 text-sm leading-5",
				lg: "min-w-10 h-10 px-5 text-sm leading-5 rounded-md",
			},
			invalid: {
				true: [
					"border-border-error",
					"focus-visible:border-border-error",
					"focus-visible:outline-border-error",
				],
			},
		},
		defaultVariants: {
			variant: "outline",
			size: "md",
		},
	});

	export type InputVariants = VariantProps<typeof input>;
</script>

<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";
	import { twMerge, type ClassNameValue } from "tailwind-merge";
	import { getContext } from "svelte";
	import { FIELD_CTX, type FieldContext } from "$saas/components/field/types";

	interface Props extends Omit<HTMLInputAttributes, "size" | "class"> {
		/**
		 * The visual style of the input.
		 * @default "outline"
		 */
		variant?: InputVariants["variant"];
		/**
		 * The size of the input.
		 * @default "md"
		 */
		size?: InputVariants["size"];
		/**
		 * The colour theme of the input.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Whether the input is in an invalid state.
		 * @default false
		 */
		invalid?: boolean;
		/**
		 * Whether the input is disabled.
		 */
		disabled?: boolean;
		/**
		 * Placeholder text for the input.
		 */
		placeholder?: string;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
		/**
		 * Reference to the input element.
		 */
		ref?: HTMLInputElement | null;
	}

	let {
		variant = "outline",
		size = "md",
		colour = "gray",
		class: className,
		invalid = false,
		disabled = false,
		style,
		value = $bindable(),
		ref = $bindable(null),
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
		twMerge(
			input({
				variant,
				size,
				invalid: isInvalid,
			}),
			className,
		),
	);

	const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<input
	bind:this={ref}
	{id}
	disabled={isDisabled}
	required={isRequired}
	readonly={isReadOnly}
	class={classes}
	style={styles}
	bind:value
	{...restProps}
/>
