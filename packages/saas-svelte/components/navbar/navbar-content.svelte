<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import { NAVBAR_CTX, type NavbarContext } from "./navbar-root.svelte";
import { Flex } from "$saas/layout/flex";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/** Maximum width using Tailwind classes like "max-w-4xl", "max-w-6xl". */
	maxW?: string;
	/** Content to render inside the navbar content area. */
	children?: Snippet;
	/** Additional CSS classes to apply. */
	class?: string;
}

let { maxW, children, class: className, ...rest }: Props = $props();

const ctx = getContext<NavbarContext>(NAVBAR_CTX);
const finalClass = $derived(
	twMerge(ctx?.styles?.content() ?? "", maxW, className),
);
</script>

<Flex align="center" justify="between" gap={4} class={finalClass} {...rest}>
	{@render children?.()}
</Flex>
