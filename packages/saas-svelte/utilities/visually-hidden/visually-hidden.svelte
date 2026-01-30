<script lang="ts">
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

<span class={className ? `sr-only ${className}` : "sr-only"}>
	{@render children?.()}
</span>
