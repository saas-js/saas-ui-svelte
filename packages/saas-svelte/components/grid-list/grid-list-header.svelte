<script module lang="ts">
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind Variants styles for the GridList header component.
 */
export const gridListHeader = tv({
	base: [
		"font-medium",
		"flex sticky",
		"px-3 py-1",
		"text-fg-muted",
		"antialiased",
	],
});
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The content to render inside the header.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();
</script>

<div role="row">
	<div
		role="columnheader"
		class={twMerge(gridListHeader(), className as string)}
		{...restProps}
	>
		{@render children()}
	</div>
</div>
