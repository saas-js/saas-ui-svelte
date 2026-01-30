<script module lang="ts">
import { tv } from "tailwind-variants";

/**
 * Tailwind Variants styles for the Editable input component.
 */
export const editableInput = tv({
	base: [
		"appearance-none",
		"outline-0",
		"border-0",
		"bg-transparent",
		"w-full",
		"rounded",
		"p-1",
		"antialiased",
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
			xs: "min-h-6 text-xs",
			sm: "min-h-7 text-sm",
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
import { Editable } from "@ark-ui/svelte/editable";
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
	 * Additional props passed to Ark UI.
	 */
	[key: string]: any;
}

let { class: className, style, ...restProps }: Props = $props();

type EditableContext = {
	size: "xs" | "sm" | "md" | "lg";
	colour: string;
	invalid: boolean;
	disabled: boolean;
};

const ctx = getContext<EditableContext>(EDITABLE_CTX);
const size = $derived(ctx?.size ?? "md");
const colour = $derived(ctx?.colour ?? "gray");
const colourVars = $derived(getColourStyle(colour));
const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<Editable.Input
	class={twMerge(editableInput({ size }), className as string)}
	style={finalStyle}
	{...restProps}
/>
