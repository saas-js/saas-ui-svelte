<script lang="ts">
import { HoverCard } from "@ark-ui/svelte/hover-card";
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

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
</script>

<HoverCard.Trigger
	as="span"
	class={twMerge("inline rounded outline-none", className as string)}
	style={style}
	{...rest}
>
	{@render children()}
</HoverCard.Trigger>
