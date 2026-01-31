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

const baseStyles = "select-none inline-flex items-center gap-1 text-sm font-medium leading-sm antialiased";
const disabledStyles = $derived(isDisabled ? "text-fg-muted" : "");
</script>

<label
	for={fieldId}
	class={twMerge(baseStyles, disabledStyles, className)}
	{...restProps}
>
	{@render children?.()}
</label>
