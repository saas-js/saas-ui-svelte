<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Text } from "$saas/typography/text";
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

	const baseStyles = "inline-flex items-center gap-1 text-fg-error";
</script>

<Text
	as="span"
	size="xs"
	id={errorId}
	aria-live="polite"
	class={twMerge(baseStyles, className)}
	{...restProps}
>
	{@render children?.()}
</Text>
