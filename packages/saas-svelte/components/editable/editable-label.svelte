<script module lang="ts">
	import { tv } from "tailwind-variants";

	/**
	 * Tailwind Variants styles for the Editable label component.
	 */
	export const editableLabel = tv({
		base: [
			"font-medium",
			"text-fg-default",
			"antialiased",
			"data-disabled:opacity-50",
		],
		variants: {
			size: {
				xs: "text-xs",
				sm: "text-xs",
				md: "text-sm",
				lg: "text-sm",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});
</script>

<script lang="ts">
	import { Editable } from "@ark-ui/svelte/editable";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { EDITABLE_CTX } from "./editable-root.svelte";

	interface Props {
		/**
		 * The label content.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes.
		 */
		class?: string;
		/**
		 * Additional props passed to Ark UI.
		 */
		[key: string]: any;
	}

	let { children, class: className, ...restProps }: Props = $props();

	type EditableContext = {
		size: "xs" | "sm" | "md" | "lg";
		colour: string;
		invalid: boolean;
		disabled: boolean;
	};

	const ctx = getContext<EditableContext>(EDITABLE_CTX);
	const size = $derived(ctx?.size ?? "md");
</script>

<Editable.Label
	class={twMerge(editableLabel({ size }), className as string)}
	{...restProps}
>
	{@render children?.()}
</Editable.Label>
