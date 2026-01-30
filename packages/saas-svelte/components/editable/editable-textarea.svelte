<script module lang="ts">
import { tv } from "tailwind-variants";

/**
 * Tailwind Variants styles for the Editable textarea component.
 */
export const editableTextarea = tv({
	base: [
		"appearance-none",
		"outline-0",
		"border-0",
		"bg-transparent",
		"w-full",
		"rounded",
		"p-1",
		"antialiased",
		"resize-none",
		"placeholder:opacity-60",
		"placeholder:text-fg-muted",
		"selection:bg-fg-muted/20",
		"focus-visible:outline-1",
		"focus-visible:outline-solid",
		"focus-visible:outline-(--c-focus-ring)",
		"aria-invalid:outline-1",
		"aria-invalid:outline-solid",
		"aria-invalid:outline-border-error",
	],
	variants: {
		size: {
			xs: "min-h-9 text-xs",
			sm: "min-h-9 text-sm",
			md: "min-h-9 text-sm",
			lg: "min-h-10 text-base",
		},
	},
	defaultVariants: {
		size: "md",
	},
});
</script>

<script lang="ts">
import { mergeProps } from "@zag-js/svelte";
import { useEditableContext } from "@ark-ui/svelte/editable";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { EDITABLE_CTX } from "./editable-root.svelte";
import { getColourStyle } from "$saas/utils/colours";

interface Props {
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * Additional inline styles.
	 */
	style?: string;
	/**
	 * Number of rows for the textarea.
	 */
	rows?: number;
	/**
	 * Additional props passed to the textarea element.
	 */
	[key: string]: any;
}

let { class: className, style, rows = 2, ...restProps }: Props = $props();

type EditableCtx = {
	size: "xs" | "sm" | "md" | "lg";
	colour: string;
	invalid: boolean;
	disabled: boolean;
};

const ctx = getContext<EditableCtx>(EDITABLE_CTX);
const size = $derived(ctx?.size ?? "md");
const colour = $derived(ctx?.colour ?? "gray");
const colourVars = $derived(getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));

const editable = useEditableContext();
const inputProps = $derived(editable().getInputProps());
const mergedProps = $derived(
	mergeProps(inputProps, {
		rows,
		class: twMerge(editableTextarea({ size }), className as string),
		style: finalStyle,
		...restProps,
	}),
);
</script>

<textarea {...mergedProps}></textarea>
