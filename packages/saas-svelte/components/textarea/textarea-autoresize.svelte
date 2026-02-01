<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";
import { getColourStyle, type ColourName } from "$saas/utils/colours";

export const textareaAutoresize = tv({
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
			xs: "px-2 py-1 text-xs leading-xs",
			sm: "px-2.5 py-1.5 text-sm leading-sm",
			md: "px-3 py-1.5 text-sm leading-sm",
			lg: "px-4 py-2 text-sm leading-sm rounded-md",
			xl: "px-5 py-3.5 text-sm leading-sm rounded-md",
		},
		invalid: {
			true: [
				"border-border-error",
				"focus-visible:border-border-error",
				"focus-visible:outline-border-error",
				"enabled:hover:border-border-emphasized",
			],
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "md",
	},
});

export type TextareaAutoresizeVariants = VariantProps<
	typeof textareaAutoresize
>;
</script>

<script lang="ts">
import type { HTMLTextareaAttributes } from "svelte/elements";
import type { ClassNameValue } from "tailwind-merge";
import { Box } from "$saas/layout/box";

interface Props extends Omit<HTMLTextareaAttributes, "class"> {
	/**
	 * The visual style of the textarea.
	 * @default "outline"
	 */
	variant?: TextareaAutoresizeVariants["variant"];
	/**
	 * The size of the textarea.
	 * @default "md"
	 */
	size?: TextareaAutoresizeVariants["size"];
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
	 * Minimum number of rows.
	 * @default 1
	 */
	minRows?: number;
	/**
	 * Maximum number of rows.
	 * @default 40
	 */
	maxRows?: number;
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
	minRows = 1,
	maxRows = 40,
	value = $bindable(""),
	style,
	...restProps
}: Props = $props();

const colourVars = $derived(getColourStyle(colour));

const classes = $derived(
	textareaAutoresize({
		variant,
		size,
		invalid,
		class: className,
	}) as string,
);

const minHeight = $derived(`${1 + minRows * 1.2}em`);
const maxHeight = $derived(maxRows ? `${1 + maxRows * 1.2}em` : `auto`);
const styles = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<Box class="relative grid" style={styles}>
	<pre
		aria-hidden="true"
		class={`${classes} invisible overflow-hidden wrap-break-word whitespace-pre-wrap [grid-area:1/1/2/2]`}
		style="min-height: {minHeight}; max-height: {maxHeight}">{value +
			"\n"}</pre>

	<textarea
		bind:value={value}
		class={`${classes} resize-none overflow-hidden [grid-area:1/1/2/2]`}
		{...restProps}
	></textarea>
</Box>
