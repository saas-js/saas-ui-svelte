<script lang="ts">
import { HoverCard } from "@ark-ui/svelte/hover-card";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { HOVER_CARD_CTX, type HoverCardContext } from "./hover-card-root.svelte";
import { Box } from "$saas/layout/box";

interface Props {
	/**
	 * The trigger element content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional inline styles to apply.
	 */
	style?: string;
	[key: string]: unknown;
}

let { children, class: className, style, ...rest }: Props = $props();

const ctx = getContext<HoverCardContext>(HOVER_CARD_CTX);

function handlePrefetch() {
	ctx?.onPrefetch?.();
}
</script>

<HoverCard.Trigger {...rest}>
	{#snippet asChild(props)}
		<Box
			as="span"
			class={twMerge("inline rounded outline-none", className as string)}
			{style}
			onmouseenter={handlePrefetch}
			onfocus={handlePrefetch}
			{...props()}
		>
			{@render children()}
		</Box>
	{/snippet}
</HoverCard.Trigger>
