<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { getContext } from "svelte";
import { FIELD_CTX, type FieldContext } from "./types";

interface Props extends HTMLAttributes<HTMLSpanElement> {
	/**
	 * Additional CSS classes to apply to the error text.
	 */
	class?: string;
}

let { class: className, children, ...restProps }: Props = $props();

const fieldContext = getContext<FieldContext>(FIELD_CTX);
const errorId = $derived(`${$fieldContext.id}-error-text`);
</script>

<span
	id={errorId}
	aria-live="polite"
	class={[
		"inline-flex",
		"items-center",
		"gap-1",
		"text-fg-error",
		"text-xs",
		"leading-4",
		"antialiased",
		className,
	]
		.filter(Boolean)
		.join(" ")}
	{...restProps}
>
	{@render children?.()}
</span>
