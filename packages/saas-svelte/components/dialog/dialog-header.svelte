<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<div
	class={twMerge(
		"flex",
		"flex-0",
		"ps-6",
		"pe-6",
		"pt-4",
		"pb-2",
		"antialiased",
		className,
	)}
	{...rest}
>
	{@render children()}
</div>
