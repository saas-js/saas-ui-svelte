<script lang="ts">
import { Box } from "$saas/layout/box";
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

<Box as="span" class={className ? `sr-only ${className}` : "sr-only"}>
	{@render children?.()}
</Box>
