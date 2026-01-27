<script lang="ts">
	import Stack from "./stack.svelte";
	import type { ComponentProps } from "svelte";

	type Props = ComponentProps<typeof Stack>;

	let {
		children,
		class: className,
		direction = "column",
		align = "stretch",
		...restProps
	}: Props = $props();
</script>

<Stack {direction} {align} class={className} {...restProps}>
	{@render children?.()}
</Stack>
