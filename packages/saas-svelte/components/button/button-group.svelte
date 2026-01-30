<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";

let {
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	role="group"
	class={twMerge(
		"inline-flex items-center *:not-first:-ml-px *:not-first:rounded-l-none *:not-last:rounded-r-none",
		className as string,
	)}
	{...rest}
>
	{@render children?.()}
</div>
