<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { actionBar } from "./action-bar.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {}

	let { class: className, ...restProps }: Props = $props();

	const styles = actionBar();
</script>

<div
	class={twMerge(styles.separator() as string, className as string)}
	data-part="action-bar-separator"
	role="separator"
	aria-orientation="vertical"
	{...restProps}
></div>
