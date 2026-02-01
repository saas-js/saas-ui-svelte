<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Text } from "$saas/typography/text";
	import { FIELD_CTX, type FieldContext } from "./types";

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/**
		 * Additional CSS classes to apply to the helper text.
		 */
		class?: string;
	}

	let { class: className, children, ...restProps }: Props = $props();

	const fieldContext = getContext<FieldContext>(FIELD_CTX);
	const helperId = $derived(`${$fieldContext.id}-helper-text`);

	const baseStyles = "text-fg-muted";
</script>

<Text
	as="span"
	size="xs"
	id={helperId}
	class={twMerge(baseStyles, className)}
	{...restProps}
>
	{@render children?.()}
</Text>
