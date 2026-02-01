<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { Flex } from "$saas/layout/flex";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		class?: string;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Flex
	wrap="wrap"
	align="center"
	justify="end"
	class={twMerge(
		"gap-x-3 gap-y-3 ps-6 pe-6 pt-2 pb-4 antialiased *:shrink-0",
		className,
	)}
	{...rest}
>
	{@render children()}
</Flex>
