<script lang="ts">
	import Stack from "./stack.svelte";
	import type { ComponentProps } from "svelte";

	// Inherit props from Stack but default direction to row
	type Props = ComponentProps<typeof Stack>;

	let {
		children,
		class: className,
		direction = "row",
		align = "center",
		...restProps
	}: Props = $props();
</script>

<Stack {direction} {align} class={className} {...restProps}>
	{#if children}
		{@render children()}
	{:else}
		<slot />
	{/if}
</Stack>
