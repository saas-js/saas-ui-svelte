<script lang="ts">
import { Popover } from "@ark-ui/svelte/popover";
import type { Snippet, Component } from "svelte";
import { Button } from "$saas/components/button";
import { Icon } from "$saas/components/icon";

interface Props {
	/**
	 * The trigger element. Receives trigger props that must be spread onto an interactive element.
	 * Optional when using triggerText or triggerIcon.
	 */
	children?: Snippet<[{ props: () => Record<string, any> }]>;
	/**
	 * Simple text to display on the trigger button.
	 */
	triggerText?: string;
	/**
	 * Icon component to display on the trigger button.
	 */
	triggerIcon?: Component;
	/**
	 * Variant for the auto-generated trigger button.
	 * @default "outline"
	 */
	triggerVariant?: "ghost" | "outline" | "solid" | "subtle" | "plain";
	/**
	 * Size for the auto-generated trigger button.
	 * @default "sm"
	 */
	triggerSize?: "xs" | "sm" | "md" | "lg";
	/**
	 * CSS classes to apply to the auto-generated trigger button.
	 */
	triggerClass?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: unknown;
}

let {
	children,
	triggerText,
	triggerIcon,
	triggerVariant = "outline",
	triggerSize = "sm",
	triggerClass,
	class: className,
	...rest
}: Props = $props();

const hasSimpleTrigger = $derived(triggerText || triggerIcon);
</script>

<Popover.Trigger class={className} {...rest}>
	{#snippet asChild(props)}
		{#if children}
			{@render children({ props })}
		{:else if hasSimpleTrigger}
			<Button
				variant={triggerVariant}
				size={triggerSize}
				icon={triggerIcon && !triggerText}
				class={triggerClass}
				{...props()}
			>
				{#if triggerIcon}
					<Icon as={triggerIcon} aria-hidden="true" />
				{/if}
				{#if triggerText}
					{triggerText}
				{/if}
			</Button>
		{/if}
	{/snippet}
</Popover.Trigger>
