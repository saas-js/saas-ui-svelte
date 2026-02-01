<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { group } from "$saas/layout/group";

	let {
		class: className,
		children,
		...rest
	}: HTMLAttributes<HTMLDivElement> = $props();

	const classes = $derived(
		twMerge(group({ attached: true }), className as string),
	);
</script>

<div role="group" class={classes} {...rest}>
	{@render children?.()}
</div>
