<script module lang="ts">
import { tv } from "tailwind-variants";

/**
 * Tailwind Variants styles for the Editable preview component.
 */
export const editablePreview = tv({
	base: [
		"cursor-text",
		"inline-flex",
		"items-center",
		"rounded",
		"py-1",
		"px-1",
		"antialiased",
		"transition-colors",
		"duration-200",
		"hover:bg-bg-muted",
		"focus-visible:outline-none",
		"data-disabled:cursor-not-allowed",
		"data-disabled:opacity-50",
		"data-disabled:select-none",
		"data-placeholder-shown:text-fg-muted",
		"selection:bg-fg-muted/20",
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

interface Props {
	/**
	 * Additional CSS classes.
	 */
	class?: string;
	/**
	 * Additional props passed to Ark UI.
	 */
	[key: string]: any;
}

let { class: className, ...restProps }: Props = $props();

type EditableContext = {
	size: "xs" | "sm" | "md" | "lg";
	colour: string;
	invalid: boolean;
	disabled: boolean;
};

const ctx = getContext<EditableContext>(EDITABLE_CTX);
const size = $derived(ctx?.size ?? "md");
</script>

<Editable.Preview
	class={twMerge(editablePreview({ size }), className as string)}
	role="button"
	{...restProps}
/>
