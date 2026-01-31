<script lang="ts">
import { Popover } from "@ark-ui/svelte/popover";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import XIcon from "phosphor-svelte/lib/XIcon";
import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";
import { Button } from "$saas/components/button";

interface Props {
	/**
	 * Custom content for the close trigger. Receives trigger props that must be spread onto an interactive element.
	 */
	children?: Snippet<[() => Record<string, unknown>]>;
	/**
	 * Simple text to display on the close button (creates a text button instead of icon).
	 */
	buttonText?: string;
	/**
	 * Variant for the auto-generated button when using buttonText.
	 * @default "ghost"
	 */
	buttonVariant?: "ghost" | "outline" | "solid" | "subtle" | "plain";
	/**
	 * Size for the auto-generated button when using buttonText.
	 * @default "sm"
	 */
	buttonSize?: "xs" | "sm" | "md" | "lg";
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Accessible label for the close button.
	 * @default "Close"
	 */
	"aria-label"?: string;
	[key: string]: unknown;
}

let {
	children,
	buttonText,
	buttonVariant = "ghost",
	buttonSize = "sm",
	class: className,
	"aria-label": ariaLabel = "Close",
	...rest
}: Props = $props();

const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

{#if children}
	<Popover.CloseTrigger aria-label={ariaLabel} {...rest}>
		{#snippet asChild(props)}
			{@render children(props as unknown as () => Record<string, unknown>)}
		{/snippet}
	</Popover.CloseTrigger>
{:else if buttonText}
	<Popover.CloseTrigger aria-label={ariaLabel} {...rest}>
		{#snippet asChild(props)}
			<Button variant={buttonVariant} size={buttonSize} {...(props() as Record<string, unknown>)}>
				{buttonText}
			</Button>
		{/snippet}
	</Popover.CloseTrigger>
{:else}
	<Popover.CloseTrigger
		class={twMerge(ctx?.styles?.closeTrigger() ?? "", className as string)}
		aria-label={ariaLabel}
		{...rest}
	>
		<XIcon class="size-4" aria-hidden="true" />
	</Popover.CloseTrigger>
{/if}
