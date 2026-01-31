<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { Flex } from "$saas/layout/flex";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The footer content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...rest }: Props = $props();
</script>

<Flex
	align="center"
	justify="end"
	class={twMerge("gap-3 pb-4 pt-2 ps-6 pe-6 antialiased", className)}
	{...rest}
>
	{@render children()}
</Flex>
