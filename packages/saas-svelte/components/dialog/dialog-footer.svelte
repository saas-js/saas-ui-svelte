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
	class={twMerge("gap-y-3 gap-x-3 pb-4 pt-2 ps-6 pe-6 antialiased *:shrink-0", className)}
	{...rest}
>
	{@render children()}
</Flex>
