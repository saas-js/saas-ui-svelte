<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { Text } from "$saas/typography/text";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The description content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let { children, class: className, ...restProps }: Props = $props();

const finalClass = $derived(twMerge("opacity-[0.64]", className));
</script>

<Text as="div" size="sm" class={finalClass} {...(restProps as Record<string, unknown>)}>
	{@render children()}
</Text>
