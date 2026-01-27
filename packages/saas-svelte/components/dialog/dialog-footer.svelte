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
		"items-center",
		"justify-end",
		"gap-y-3",
		"gap-x-3",
		"pb-4",
		"pt-2",
		"ps-6",
		"pe-6",
		"antialiased",
		className,
	)}
	{...rest}
>
	{@render children()}
</div>
