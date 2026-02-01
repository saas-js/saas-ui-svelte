<script module lang="ts">
import { tv } from "tailwind-variants";

export const visuallyHidden = tv({
	base: "sr-only",
});
</script>

<script lang="ts">
import { Box } from "$saas/layout/box";
import { twMerge } from "tailwind-merge";
import type { Snippet } from "svelte";

interface Props {
	/**
	 * The content to be visually hidden
	 */
	children: Snippet;
	/**
	 * Additional CSS classes
	 */
	class?: string;
}

let { children, class: className }: Props = $props();
</script>

<Box as="span" class={twMerge(visuallyHidden(), className)}>
	{@render children?.()}
</Box>
