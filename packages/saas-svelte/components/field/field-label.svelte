<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const fieldLabel = tv({
		base: "select-none inline-flex items-center gap-1 text-sm font-medium leading-sm antialiased",
		variants: {
			disabled: {
				true: "text-fg-muted",
				false: "",
			},
		},
		defaultVariants: {
			disabled: false,
		},
	});

	export type FieldLabelVariants = VariantProps<typeof fieldLabel>;
</script>

<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { FIELD_CTX, type FieldContext } from "./types";

	interface Props extends HTMLLabelAttributes {
		/**
		 * The ID of the form control this label is for.
		 */
		for?: string;
		/**
		 * Additional CSS classes to apply to the label.
		 */
		class?: string;
	}

	let {
		for: htmlFor,
		class: className,
		children,
		...restProps
	}: Props = $props();

	const fieldContext = getContext<FieldContext>(FIELD_CTX);
	const fieldId = $derived(htmlFor || $fieldContext.id);
	const isDisabled = $derived($fieldContext.disabled);
</script>

<label
	for={fieldId}
	class={twMerge(fieldLabel({ disabled: isDisabled }), className)}
	{...restProps}
>
	{@render children?.()}
</label>
